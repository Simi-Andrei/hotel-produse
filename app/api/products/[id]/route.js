import connectDB from "@/lib/database";
import Product from "@/models/product";
import Shelf from "@/models/shelf";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = params;

    await connectDB();

    const product = await Product.findById(id);

    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to retrieve the product from the database",
    });
  }
};

export const POST = async (req, { params }) => {
  try {
    const { id } = params;
    const { brand, stock, shelf, slot } = await req.json();

    await connectDB();

    let existingProduct;

    if (id) {
      existingProduct = await Product.findById(id);
    }

    if (existingProduct) {
      const assignedShelf = existingProduct.shelf;
      const assignedSlot = existingProduct.slot;

      const shelfToFree = await Shelf.findOne({
        number: assignedShelf.toUpperCase(),
      });

      if (shelfToFree) {
        shelfToFree.slots[assignedSlot] = false;
        await shelfToFree.save();
      }

      const shelfToOccupy = await Shelf.findOne({
        number: shelf.toUpperCase(),
      });

      if (shelfToOccupy) {
        shelfToOccupy.slots[slot] = true;
        await shelfToOccupy.save();
      }

      existingProduct.brand = brand;
      existingProduct.stock = stock;
      existingProduct.shelf = shelf;
      existingProduct.slot = slot;
      await existingProduct.save();
    } else {
      const newProduct = new Product({ brand, stock, shelf, slot });
      await newProduct.save();

      const shelfToUpdate = await Shelf.findOne({
        number: shelf.toUpperCase(),
      });
      if (shelfToUpdate) {
        shelfToUpdate.slots[slot] = true;
        await shelfToUpdate.save();
      }
    }

    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json({ error: "Failed to edit the product" });
  }
};
