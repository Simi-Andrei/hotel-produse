import connectDB from "@/lib/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;

    await connectDB();

    const userToDelete = await User.findById(id);

    if (userToDelete) {
      await userToDelete.deleteOne();
    } else {
      return NextResponse.json(
        { message: "User to delete was not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(id);
  } catch (error) {
    return NextResponse.json({
      error: "Failed to delete the user from the database!",
    });
  }
};
