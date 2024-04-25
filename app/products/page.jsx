import connectDB from "@/lib/database";
import Product from "@/models/product";
import ProductsList from "@/app/components/productsList/ProductsList";
import SearchInput from "@/app/components/searchInput/SearchInput";
import AddProductButton from "@/app/components/addProductButton/AddProductButton";
import Pagination from "@/app/components/pagination/Pagination";

export const getProducts = async ({ search, page = 1 }) => {
  try {
    await connectDB();

    let filter = {};

    if (search) {
      filter = {
        $or: [
          { customerLastname: { $regex: `^${search}`, $options: "i" } },
          { customerFirstname: { $regex: `^${search}`, $options: "i" } },
        ],
      };
    }

    let limit = 20;

    const skip = (page - 1) * limit;

    const products = await Product.find(filter).skip(skip).limit(limit);

    const searchedProducts = await Product.find(filter);

    const totalProducts = await Product.countDocuments();

    return { products, searchedProducts, totalProducts };
  } catch (error) {
    console.log(error);
  }
};

const ProductsPage = async ({ searchParams }) => {
  const search = searchParams?.search || undefined;
  const page = searchParams?.page || 1;

  const { products, searchedProducts, totalProducts } = await getProducts({
    search,
    page,
  });

  return (
    <div className="h-full flex flex-col justify-center text-sm">
      <div className="py-1 flex items-center justify-between">
        <AddProductButton />
        <SearchInput search={search} page={page} />
      </div>
      <div className="py-1 flex-1">
        <ProductsList products={products} page={page} />
      </div>
      {searchedProducts.length !== 0 && (
        <div className="py-1">
          <Pagination
            products={products}
            searchedProducts={searchedProducts}
            totalProducts={totalProducts}
            search={search}
            page={page}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
