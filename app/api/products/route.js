import connectDB from "@/lib/database";
import Product from "@/models/product";
import Shelf from "@/models/shelf";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectDB();

    const products = await Product.find({});

    const totalProductsNumber = await Product.countDocuments();

    return NextResponse.json({ products, totalProductsNumber });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to retrieve the products from the database!",
    });
  }
};

export const POST = async (req, res) => {
  try {
    const { customerLastname, customerFirstname, brand, stock, shelf, slot } =
      await req.json();

    await connectDB();

    const newProduct = new Product({
      customerLastname,
      customerFirstname,
      brand,
      stock,
      shelf,
      slot,
    });

    await newProduct.save();

    const shelfToUpdate = await Shelf.findOne({ number: shelf.toUpperCase() });
    if (shelfToUpdate) {
      shelfToUpdate.slots[slot] = true;
      await shelfToUpdate.save();
    }

    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add product to database!" });
  }
};
