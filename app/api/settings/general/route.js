import connectDB from "@/lib/database";
import Product from "@/models/product";
import Shelf from "@/models/shelf";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const { shelves, slots } = await req.json();

    await connectDB();

    await Shelf.deleteMany();

    function convertToExcelColumn(num) {
      let dividend = num + 1;
      let columnName = "";

      while (dividend > 0) {
        let modulo = (dividend - 1) % 26;
        columnName = String.fromCharCode(65 + modulo) + columnName;
        dividend = Math.floor((dividend - modulo) / 26);
      }

      return columnName;
    }

    for (let i = 0; i < shelves; i++) {
      const shelfNumber = convertToExcelColumn(i);
      const slotsArray = Array.from({ length: slots }, () => false);
      await Shelf.create({ number: shelfNumber, slots: slotsArray });
    }

    await Product.deleteMany({});

    return NextResponse.json({
      message: "Shelves created successfully and products deleted!",
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to set database shelves and slots!",
    });
  }
};
