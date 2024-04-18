import connectDB from "@/lib/database";
import Shelf from "@/models/shelf";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectDB();

    const shelves = await Shelf.find({});

    return NextResponse.json(shelves);
  } catch (error) {
    return NextResponse.json({
      error: "Failed to retrieve the shelves from the database!",
    });
  }
};
