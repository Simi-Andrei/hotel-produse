"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { IoCloseCircleOutline } from "react-icons/io5";

const SearchInput = ({ page }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [query] = useDebounce(searchTerm, 500);

  const router = useRouter();

  useEffect(() => {
    if (!query && !page) {
      router.push("/products");
    } else {
      router.push(`/products${query ? "?search=" + query : "?page=" + page}`);
    }
  }, [query, router, searchTerm]);

  return (
    <div className="relative">
      <input
        className="py-1 px-2 w-64 rounded focus:outline-gray-300 border border-gray-200 bg-gray-50"
        type="text"
        placeholder="Cauta..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm !== "" && (
        <button
          className="absolute top-1/2 -translate-y-1/2 right-0 opacity-50 p-2"
          onClick={() => setSearchTerm("")}
          type="button"
        >
          <IoCloseCircleOutline />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
