import { Schema, model, models } from "mongoose";

const ShelfSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true,
    },
    slots: {
      type: [Boolean],
      required: true,
    },
  },
  { timestamps: true }
);

const Shelf = models.Shelf || model("Shelf", ShelfSchema);

export default Shelf;
