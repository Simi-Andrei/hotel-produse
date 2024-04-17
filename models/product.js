import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    dimensions: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
    speedIndicator: {
      type: String,
      required: true,
    },
    sell: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
