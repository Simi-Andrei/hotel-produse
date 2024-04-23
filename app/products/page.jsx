"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DeleteProductButton from "@/app/components/deleteProductButton/DeleteProductButton";
import Loader from "@/app/components/loader/Loader";
import { FaEdit } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import SearchProductButton from "@/app/components/searchProductButton/SearchProductButton";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoadingProducts(true);
        const res = await fetch("/api/products");
        if (res.ok) {
          const { products } = await res.json();
          setProducts(products);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingProducts(false);
      }
    };

    getAllProducts();
  }, []);

  return loadingProducts ? (
    <Loader />
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
                  {index + 1}
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
        <span className="mr-3">
          <FiChevronsLeft />
        </span>
        <span>1/2</span>
        <span className="ml-3">
          <FiChevronsRight />
        </span>
      </div>
    </div>
  );
};

export default ProductsPage;
