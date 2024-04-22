"use client";

import { revalidate } from "@/utils/revalidate";
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteProductButton = ({ productId }) => {
  const id = JSON.parse(productId);

  const deleteProductHandler = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

      if (res.ok) {
        revalidate("/products");
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={() => deleteProductHandler(id)}
      className="p-1.5 border border-gray-200 rounded-sm hover:bg-gray-200 duration-500"
    >
      <FaRegTrashAlt className="text-red-500" />
    </button>
  );
};

export default DeleteProductButton;
