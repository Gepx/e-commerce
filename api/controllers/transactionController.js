import { transactionQueryParamZodSchema } from "../schemas/transactionZodSchema.js";
import cacheService from "../services/cacheService.js";
import transactionService from "../services/transactionService.js";
import midtransClient from "midtrans-client";
import { z } from "zod";

const createTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const customerDetails = req.body;
    const result = await transactionService.createTransService(
      userId,
      customerDetails
    );

    return res.status(200).json({
      message: "Transaction created successfully",
      orderId: result.orderId,
      token: result.token,
      redirect_url: result.redirect_url,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Oops! Something went wrong!" });
  }
};

const createDirectBuyTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { customerDetails, items } = req.body;
    const result = await transactionService.createDirectBuyTransService(
      userId,
      customerDetails,
      items
    );

    return res.status(200).json({
      message: "Direct buy transaction created successfully",
      orderId: result.orderId,
      token: result.token,
      redirect_url: result.redirect_url,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || "Oops! Something went wrong!" });
  }
};

const getTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const parsed = await transactionQueryParamZodSchema.parseAsync(req.query);

    const cacheKey = `transactions:${userId}:${JSON.stringify(parsed)}`;
    const cacheTransactions = await cacheService.get(cacheKey);
    if (cacheTransactions) {
      return res.status(200).json(cacheTransactions);
    }

    const result = await transactionService.getTransService(userId, {
      orderId: parsed.orderId,
      status: parsed.status,
      page: parsed.page,
      limit: parsed.limit,
    });

    const response = {
      message: "Transaction retrieved successfully",
      data: result.transactions,
      pagination: {
        total: result.total,
        page: parsed.page,
        limit: parsed.limit,
        totalPages: Math.ceil(result.total / parsed.limit),
      },
    };

    await cacheService.set(cacheKey, response, 600);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Invalid query parameters", errors: error.errors });
    }
    res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

const updateTransactionStatus = async (req, res) => {
  try {
    const notification = req.body;

    const core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const statusResponse = await core.transaction.notification(notification);

    await transactionService.updateTransStatusService(statusResponse);

    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(200).send("OK");
  }
};

export default {
  createTransaction,
  createDirectBuyTransaction,
  getTransaction,
  updateTransactionStatus,
};
