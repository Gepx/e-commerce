import express from "express";
import TransactionController from "../controllers/transactionController.js";
import verifyToken from "../middleware/auth/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, TransactionController.getTransaction);
router.post("/create", verifyToken, TransactionController.createTransaction);
router.post(
  "/direct-buy",
  verifyToken,
  TransactionController.createDirectBuyTransaction
);
router.post("/notification", TransactionController.updateTransactionStatus);

export default router;
