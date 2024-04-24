"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [query] = useDebounce(searchTerm, 500);

  const router = useRouter();

  useEffect(() => {
    if (!query) {
      router.push("/products");
    } else {
      router.push(`/products?search=${query}`);
    }
  }, [query, router]);

  return (
    <input
      className="py-1 px-2 w-64 rounded focus:outline-gray-300 border border-gray-200 bg-gray-50"
      type="text"
      placeholder="Cauta..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchInput;
