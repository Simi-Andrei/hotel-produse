import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    customerFirstname: {
      type: String,
      required: true,
    },
    customerLastname: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    shelf: {
      type: String,
      required: true,
    },
    slot: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
