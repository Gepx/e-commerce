import midtransClient from "midtrans-client";
import Transaction from "../models/transactionModel.js";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export function toTransactionItems(rawItems) {
  return rawItems.map((item) => ({
    productId: item.productId,
    productName: item.productName,
    image: item.image ?? item.productImage ?? null,
    price: item.price,
    quantity: item.quantity,
  }));
}

export function calcTotalAmount(items) {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

export function buildSnapParams(
  orderId,
  items,
  totalAmount,
  customer,
  shipping
) {
  return {
    transaction_details: { order_id: orderId, gross_amount: totalAmount },
    item_details: items.map((it) => ({
      id: it.productId.toString(),
      price: it.price,
      quantity: it.quantity,
      name: it.productName,
    })),
    customer_details: customer,
    shipping_address: shipping,
    enabled_payments: [
      "gopay",
      "shopeepay",
      "other_qris",
      "credit_card",
      "cimb_clicks",
      "bca_klikbca",
      "bca_klikpay",
      "bni_va",
      "bri_va",
      "echannel",
      "permata_va",
      "other_va",
    ],
  };
}

export async function createSnapAndPersist({
  userId,
  orderId,
  items,
  totalAmount,
  shippingAddressId,
  customer,
  shipping,
  selectedItemIds,
}) {
  const params = buildSnapParams(
    orderId,
    items,
    totalAmount,
    customer,
    shipping
  );
  const midtransResponse = await snap.createTransaction(params);

  const transaction = new Transaction({
    user: userId,
    orderId,
    items,
    totalAmount,
    status: "pending",
    shippingAddress: shippingAddressId,
    ...(selectedItemIds?.length ? { selectedItemIds } : {}),
  });

  transaction.token = midtransResponse.token;
  transaction.redirect_url = midtransResponse.redirect_url;
  await transaction.save();

  return {
    orderId,
    token: midtransResponse.token,
    redirect_url: midtransResponse.redirect_url,
  };
}
