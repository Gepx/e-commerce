const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["color", "size"],
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
  },
  { _id: false }
);

const variationSchema = new mongoose.Schema(
  {
    attributes: {
      type: Map,
      of: String,
      default: {},
    },
    stock: { type: Number, default: 0, min: 0 },
    price: { type: Number },
    image: { type: String },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    productImages: {
      type: [String],
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productSpecification: {
      brand: String,
      weight: {
        value: Number,
        unit: { type: String, enum: ["g", "kg", "lb"] },
      },
      material: String,
      origin: String,
      warranty: String,
    },
    productDescription: {
      type: String,
    },
    productCategory: {
      type: [String],
      default: [],
      required: true,
    },
    variants: {
      type: [variantSchema],
      default: [],
    },
    variations: {
      type: [variationSchema],
      default: [],
    },
    productPrice: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          default: 0,
          min: 0,
          max: 5,
        },
        comment: { type: String },
      },
    ],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
