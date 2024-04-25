import Product from "@/models/product";
import connectDB from "./database";

export const getProducts = async ({ search, page = 1 }) => {
  try {
    await connectDB();

    let filter = {};

    if (search) {
      filter = {
        $or: [
          { customerLastname: { $regex: `^${search}`, $options: "i" } },
          { customerFirstname: { $regex: `^${search}`, $options: "i" } },
        ],
      };
    }

    let limit = 20;

    const skip = (page - 1) * limit;

    const products = await Product.find(filter).skip(skip).limit(limit);

    return products;
  } catch (error) {
    console.log(error);
  }
};
