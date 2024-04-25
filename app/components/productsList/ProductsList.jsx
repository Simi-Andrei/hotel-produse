import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import DeleteProductButton from "@/app/components/deleteProductButton/DeleteProductButton";

const ProductsList = ({ products, page }) => {
  return (
    <div>
      <table className="border-collapse w-full">
        <thead>
          <tr className="text-xs text-left">
            <th className="border border-gray-200 py-1.5 px-1 text-center w-1/12">
              Nr. Crt.
            </th>
            <th className="border border-gray-200 py-1.5 px-1 w-2/12">
              NUME CLIENT
            </th>
            <th className="border border-gray-200 py-1.5 px-1 w-2/12">
              PRENUME CLIENT
            </th>
            <th className="border border-gray-200 py-1.5 px-1 w-1/12">MARCA</th>
            <th className="border border-gray-200 py-1.5 px-1 w-1/12">STOC</th>
            <th className="border border-gray-200 py-1.5 px-1 w-1/12">RAFT</th>
            <th className="border border-gray-200 py-1.5 px-1 w-1/12">SLOT</th>
            <th className="border border-gray-200 py-1.5 px-1 text-center w-1/12">
              ACTIUNI
            </th>
          </tr>
        </thead>
        {products.length === 0 ? (
          <tbody>
            <tr>
              <td
                className="border border-gray-200 py-0.5 px-1 text-center"
                colSpan={8}
              >
                <p>
                  Nu exista produse. Adauga produs sau foloseste alt cuvant de
                  cautare.
                </p>
              </td>
            </tr>
          </tbody>
        ) : (
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
        )}
      </table>
    </div>
  );
};

export default ProductsList;
