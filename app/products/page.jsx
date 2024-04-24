import { getProducts } from "@/lib/products";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import ProductsList from "@/app/components/productsList/ProductsList";
import SearchInput from "@/app/components/searchInput/SearchInput";
import AddProductButton from "@/app/components/addProductButton/AddProductButton";

const ProductsPage = async ({ searchParams }) => {
  const search = searchParams?.search || undefined;
  const page = searchParams?.page || 1;
  const limit = searchParams?.limit || 20;

  const products = await getProducts({ search, page, limit });

  return (
    <div className="h-full flex flex-col justify-center text-sm">
      <div className="py-1 flex items-center justify-between">
        <AddProductButton />
        <SearchInput />
      </div>
      <div className="py-1 flex-1">
        <ProductsList products={products} />
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
