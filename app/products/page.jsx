import connectDB from "@/lib/database";
import Product from "@/models/product";
import Link from "next/link";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import SlotsMap from "@/app/components/slotsMap/SlotsMap";

const getAllProducts = async () => {
  try {
    await connectDB();

    const products = await Product.find({});

    return products;
  } catch (error) {
    console.log;
  }
};

const ProductsPage = async () => {
  const products = await getAllProducts();

  return (
    <div className="h-full flex flex-col text-sm">
      <div className="py-1">
        <Link
          className="font-semibold inline-block bg-orange-500 rounded py-1 px-2 text-white"
          href="/products/add"
        >
          + Adauga
        </Link>
      </div>
      <div className="py-1 flex-1">
        <table className="border border-gray-200 border-collapse w-full">
          <thead>
            <tr className="text-xs text-left">
              <th className="border border-gray-200 py-1.5 px-1 text-center w-16">
                Nr. Crt.
              </th>
              <th className="border border-gray-200 py-1.5 px-1">MARCA</th>
              <th className="border border-gray-200 py-1.5 px-1">STOC</th>
              <th className="border border-gray-200 py-1.5 px-1">RAFT</th>
              <th className="border border-gray-200 py-1.5 px-1">SLOT</th>
              <th className="border border-gray-200 py-1.5 px-1 text-center w-20">
                ACTIUNI
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="text-xs">
                <td className="border border-gray-200 py-0.5 px-1 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-200 py-0.5 px-1">
                  {product.brand}
                </td>
                <td className="border border-gray-200 py-0.5 px-1">
                  {product.stock}
                </td>
                <td className="border border-gray-200 py-0.5 px-1">
                  {product.shelf}
                </td>
                <td className="border border-gray-200 py-0.5 px-1">
                  {product.slot}
                </td>
                <td className="border border-gray-200 py-0.5 px-1">
                  <div className="flex items-center justify-evenly">
                    <Link
                      className="p-1.5 border border-gray-200 rounded hover:bg-gray-200 duration-500"
                      href="/"
                    >
                      <FaEdit className="text-blue-500" />
                    </Link>
                    <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-200 duration-500">
                      <FaRegTrashAlt className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-1 flex items-center justify-center font-semibold border-t border-gray-200">
        <FiChevronsLeft className="mr-3" />
        <span>1 / 12</span>
        <FiChevronsRight className="ml-3" />
      </div>
      <SlotsMap />
    </div>
  );
};

export default ProductsPage;
