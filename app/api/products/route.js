import connectDB from "@/lib/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const product = await req.json();
    console.log(product);

    await connectDB();

    const newProduct = new Product(product);

    await newProduct.save();

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add product to database!" });
  }
};
