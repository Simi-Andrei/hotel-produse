import connectDB from "@/lib/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const GET = async (req, res) => {
  try {
    await connectDB();

    const users = await User.find({});

    const totalUsersNumber = await User.countDocuments();

    return NextResponse.json({ users, totalUsersNumber });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to retrieve the users from the database!",
    });
  }
};

export const POST = async (req, res) => {
  try {
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await connectDB();

    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { error: "Un utilizator cu acest email exista deja!" },
        { status: 400 }
      );
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Error when creating the user" },
      { status: 500 }
    );
  }
};
