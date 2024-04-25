import Link from "next/link";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const Pagination = ({
  products,
  searchedProducts,
  totalProducts,
  search,
  page,
}) => {
  return (
    <div className="flex items-center justify-center font-semibold mt-4">
      <Link
        className={`mr-3 p-2 ${
          +page === 1 && "pointer-events-none text-gray-400"
        }`}
        href={`${
          search
            ? "/products?search=" + search + "&page=" + (+page - 1)
            : "/products?page=" + (+page - 1)
        }`}
      >
        <FiChevronsLeft />
      </Link>
      <span>
        <span className="mr-1">{page}</span>/
        <span className="ml-1">
          {search !== ""
            ? Math.min(
                Math.ceil(searchedProducts.length / 20),
                Math.ceil(totalProducts / 20)
              )
            : Math.ceil(totalProducts / 20)}
        </span>
      </span>
      <Link
        className={`ml-3 p-2 ${
          +page ===
            Math.min(
              Math.ceil(searchedProducts.length / 20),
              Math.ceil(totalProducts / 20)
            ) && "pointer-events-none text-gray-400"
        }`}
        href={`${
          search
            ? "/products?search=" + search + "&page=" + (+page + 1)
            : "/products?page=" + (+page + 1)
        }`}
      >
        <FiChevronsRight />
      </Link>
    </div>
  );
};

export default Pagination;
