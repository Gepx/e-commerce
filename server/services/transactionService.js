import Transaction from "../models/transactionModel.js";
import Cart from "../models/cartModel.js";
import Address from "../models/addressModel.js";
import { v4 as uuidv4 } from "uuid";
import {
  calcTotalAmount,
  createSnapAndPersist,
} from "../utils/transactionHelper.js";
import midtransClient from "midtrans-client";
import notificationService from "./notificationService.js";

const createTransService = async (userId, customerDetails) => {
  const userCart = await Cart.findOne({ user: userId }).populate(
    "items.product"
  );
  if (!userCart || userCart.items.length === 0)
    throw new Error("Cart is empty");

  if (!customerDetails?.shippingAddressId)
    throw new Error("shippingAddressId is required");
  const addr = await Address.findOne({
    _id: customerDetails.shippingAddressId,
    user: userId,
  });
  if (!addr) throw new Error("Shipping address not found");

  let itemsToProcess = userCart.items;
  if (
    customerDetails.selectedItemIds &&
    customerDetails.selectedItemIds.length > 0
  ) {
    itemsToProcess = userCart.items.filter((item) =>
      customerDetails.selectedItemIds.includes(item._id.toString())
    );
    if (itemsToProcess.length === 0) {
      throw new Error("No selected items found in cart");
    }
  }

  const transactionItems = itemsToProcess.map((item) => ({
    productId: item.product._id,
    productName: item.product.productName,
    image: Array.isArray(item.product.productImages)
      ? item.product.productImages[0]
      : null,
    price: item.price,
    quantity: item.quantity,
  }));

  const totalAmount = calcTotalAmount(transactionItems);

  const orderId = `ORD-${uuidv4()}`;

  return createSnapAndPersist({
    userId,
    orderId,
    items: transactionItems,
    totalAmount,
    shippingAddressId: customerDetails.shippingAddressId,
    customer: {
      first_name: customerDetails.firstName,
      last_name: customerDetails.lastName,
      email: customerDetails.email,
      phone: customerDetails.phone,
    },
    shipping: {
      first_name: customerDetails.firstName,
      last_name: customerDetails.lastName,
      email: customerDetails.email,
      phone: customerDetails.phone,
      address: addr.address,
    },
    selectedItemIds: customerDetails.selectedItemIds,
  });
};

const createDirectBuyTransService = async (userId, customerDetails, items) => {
  if (!customerDetails?.shippingAddressId)
    throw new Error("shippingAddressId is required");
  const addr = await Address.findOne({
    _id: customerDetails.shippingAddressId,
    user: userId,
  });
  if (!addr) throw new Error("Shipping address not found");

  if (!items || items.length === 0)
    throw new Error("Items are required for direct purchase");

  const Product = (await import("../models/productModel.js")).default;

  const transactionItems = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product)
        throw new Error(`Product with ID ${item.productId} not found`);

      return {
        productId: product._id,
        productName: product.productName,
        image: Array.isArray(product.productImages)
          ? product.productImages[0]
          : null,
        price: item.price,
        quantity: item.quantity,
      };
    })
  );

  const totalAmount = calcTotalAmount(transactionItems);

  const orderId = `BUY-${uuidv4()}`;

  return createSnapAndPersist({
    userId,
    orderId,
    items: transactionItems,
    totalAmount,
    shippingAddressId: customerDetails.shippingAddressId,
    customer: {
      first_name: customerDetails.firstName,
      last_name: customerDetails.lastName,
      email: customerDetails.email,
      phone: customerDetails.phone,
    },
    shipping: {
      first_name: customerDetails.firstName,
      last_name: customerDetails.lastName,
      email: customerDetails.email,
      phone: customerDetails.phone,
      address: addr.address,
    },
  });
};

const getTransService = async (
  userId,
  { orderId, status, page = 1, limit = 10 } = {}
) => {
  const query = { user: userId };
  if (orderId) query.orderId = String(orderId);
  if (status) query.status = String(status);

  const offset = (page - 1) * limit;
  const [transactions, total] = await Promise.all([
    Transaction.find(query).sort({ createdAt: -1 }).skip(offset).limit(limit),
    Transaction.countDocuments(query),
  ]);

  if (transactions.length) {
    const core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });
    await Promise.all(
      transactions.map(async (tx) => {
        if (tx.status === "pending") {
          try {
            const statusResp = await core.transaction.status(tx.orderId);
            let newStatus = statusResp.transaction_status;
            if (
              newStatus === "capture" &&
              statusResp.fraud_status === "accept"
            ) {
              newStatus = "settlement";
            }
            if (newStatus && newStatus !== tx.status) {
              tx.status = newStatus;
              await Transaction.updateOne(
                { _id: tx._id },
                { status: newStatus }
              );
            }
          } catch (_) {}
        }
      })
    );
  }

  return { transactions, total };
};

const updateTransStatusService = async (midtransNotification) => {
  const {
    order_id: orderId,
    transaction_status: transactionStatus,
    fraud_status: fraudStatus,
  } = midtransNotification;

  let status = transactionStatus;
  if (transactionStatus === "capture" && fraudStatus === "accept")
    status = "settlement";

  const updated = await Transaction.findOneAndUpdate(
    { orderId },
    { status },
    { new: true }
  );
  if (!updated)
    throw new Error(`Transaction with orderId ${orderId} not found`);

  if (
    status === "settlement" &&
    updated.selectedItemIds &&
    updated.selectedItemIds.length > 0
  ) {
    try {
      const mongoose = await import("mongoose");
      await Cart.updateOne(
        { user: updated.user },
        {
          $pull: {
            items: {
              _id: {
                $in: updated.selectedItemIds.map(
                  (id) => new mongoose.default.Types.ObjectId(id)
                ),
              },
            },
          },
        }
      );
      console.log(
        `Removed ${updated.selectedItemIds.length} items from cart for user ${updated.user}`
      );
    } catch (error) {
      console.error("Failed to remove items from cart:", error);
    }
  }

  if (status === "settlement") {
    try {
      const itemCount = updated.items.length;
      await notificationService.createPurchaseNotification(
        updated.user,
        updated.orderId,
        updated.totalAmount,
        itemCount
      );
    } catch (error) {
      console.error("Failed to create purchase notification:", error.message);
    }
  }

  return updated;
};

export default {
  createTransService,
  createDirectBuyTransService,
  getTransService,
  updateTransStatusService,
};
