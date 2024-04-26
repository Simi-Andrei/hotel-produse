"use client";

import { revalidate } from "@/utils/revalidate";
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteUserButton = ({ userId }) => {
  const id = JSON.parse(userId);

  const deleteUserHandler = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });

      if (res.ok) {
        revalidate("/users");
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={() => deleteUserHandler(id)}
      className="p-1.5 border border-gray-200 rounded-sm hover:bg-gray-200 duration-500"
    >
      <FaRegTrashAlt className="text-red-500" />
    </button>
  );
};

export default DeleteUserButton;
