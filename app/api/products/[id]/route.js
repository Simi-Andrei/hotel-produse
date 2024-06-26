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
      error: "Failed to retrieve the product from the database!",
    });
  }
};

export const POST = async (req, { params }) => {
  try {
    const { id } = params;
    const { customerLastname, customerFirstname, brand, stock, shelf, slot } =
      await req.json();

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

      const actualSlot = slot - 1;

      const shelfToOccupy = await Shelf.findOne({
        number: shelf.toUpperCase(),
      });

      if (shelfToOccupy) {
        if (shelfToOccupy.slots[actualSlot] === false) {
          shelfToOccupy.slots[actualSlot] = true;
          await shelfToOccupy.save();

          existingProduct.customerLastname = customerLastname;
          existingProduct.customerFirstname = customerFirstname;
          existingProduct.brand = brand;
          existingProduct.stock = stock;
          existingProduct.shelf = shelf;
          existingProduct.slot = actualSlot;
          await existingProduct.save();

          return NextResponse.json({
            message: "Product updated successfully!",
          });
        } else {
          return NextResponse.json(
            { error: "Slotul este deja ocupat!" },
            { status: 400 }
          );
        }
      } else {
        return NextResponse.json({ error: "Shelf not found!" });
      }
    } else {
      return NextResponse.json({ error: "Product not found!" });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to edit the product!" });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;

    await connectDB();

    const productToDelete = await Product.findById(id);

    if (productToDelete) {
      const shelfToFree = await Shelf.findOne({
        number: productToDelete.shelf.toUpperCase(),
      });

      if (shelfToFree) {
        shelfToFree.slots[productToDelete.slot] = false;
        await shelfToFree.save();
      } else return;

      await productToDelete.deleteOne();
    } else {
      return NextResponse.json(
        { message: "Product to delete was not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(id);
  } catch (error) {
    return NextResponse.json({
      error: "Failed to delete the product from the database!",
    });
  }
};
