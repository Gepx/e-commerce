import mongoose from "mongoose";

const TransactionItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { _id: false }
);

const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    items: {
      type: [TransactionItemSchema],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "settlement",
        "capture",
        "challenge",
        "deny",
        "cancel",
        "refund",
        "expired",
      ],
      default: "pending",
      index: true,
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    token: {
      type: String,
    },
    redirect_url: {
      type: String,
    },
    selectedItemIds: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
