import connectDB from "@/lib/database";
import Product from "@/models/product";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import DeleteProductButton from "@/app/components/deleteProductButton/DeleteProductButton";
import SearchProductButton from "@/app/components/searchProductButton/SearchProductButton";

const getAllProducts = async (page = 1, limit = 20) => {
  try {
    await connectDB();

    const skip = (page - 1) * limit;

    const products = await Product.find({}).skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();

    return { products, totalProducts };
  } catch (error) {
    console.log(error);
    return { products: [], totalProducts: 0 };
  }
};

const ProductsPage = async ({ searchParams }) => {
  let { page } = searchParams || 1;
  const { products, totalProducts } = await getAllProducts(page);

  const totalPages = Math.ceil(totalProducts / 20);

  return products.length === 0 ? (
    <div className="h-full flex flex-col items-center justify-center">
      <p className="text-center font-semibold mb-2">
        Nu exista produse de afisat
      </p>
      <div className="py-1 text-center">
        <Link
          className="font-semibold inline-block bg-orange-500 rounded py-1 px-2 text-white"
          href="/products/add"
        >
          + Adauga
        </Link>
      </div>
    </div>
  ) : (
    <div className="h-full flex flex-col justify-center text-sm">
      <div className="py-1 flex items-center justify-between">
        <Link
          className="font-semibold inline-block bg-orange-500 rounded py-1 px-2 text-white"
          href="/products/add"
        >
          + Adauga
        </Link>
        <SearchProductButton />
      </div>
      <div className="py-1 flex-1">
        <table className="border border-gray-200 border-collapse w-full">
          <thead>
            <tr className="text-xs text-left">
              <th className="border border-gray-200 py-1.5 px-1 text-center w-16">
                Nr. Crt.
              </th>
              <th className="border border-gray-200 py-1.5 px-1">
                NUME CLIENT
              </th>
              <th className="border border-gray-200 py-1.5 px-1">
                PRENUME CLIENT
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
                  {(page - 1) * 20 + index + 1}
                </td>
                <td className="border border-gray-200 py-0.5 px-1">
                  {product.customerLastname}
                </td>
                <td className="border border-gray-200 py-0.5 px-1">
                  {product.customerFirstname}
                </td>
                <td className="border border-gray-200 py-0.5 px-1">
                  {product.brand}
                </td>
                <td className="border border-gray-200 py-0.5 px-1">
                  {product.stock}
                </td>
                <td className="border border-gray-200 py-0.5 px-1 uppercase">
                  {product.shelf}
                </td>
                <td className="border border-gray-200 py-0.5 px-1">
                  {product.slot + 1}
                </td>
                <td className="border border-gray-200 py-0.5 px-1">
                  <div className="flex items-center justify-evenly">
                    <Link
                      className="p-1.5 border border-gray-200 rounded-sm hover:bg-gray-200 duration-500"
                      href={`/products/${product._id}/edit`}
                    >
                      <FaEdit className="text-blue-500" />
                    </Link>
                    <DeleteProductButton
                      productId={JSON.stringify(product._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-1 flex items-center justify-center font-semibold mt-4">
        {page >= 1 && (
          <Link
            className={`${
              +page === 1 ? "pointer-events-none text-gray-400" : ""
            } mr-3 p-2`}
            href={`/products?page=${+page - 1}`}
          >
            <FiChevronsLeft className="cursor-pointer" />
          </Link>
        )}
        <span>
          {page} / {totalPages}
        </span>
        {page <= totalPages && (
          <Link
            className={`${
              +page === totalPages ? "pointer-events-none text-gray-400" : ""
            } ml-3 p-2`}
            href={`/products?page=${+page + 1}`}
          >
            <FiChevronsRight className="cursor-pointer" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
