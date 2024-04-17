import Link from "next/link";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const ProductsPage = () => {
  return (
    <div className="w-full h-full flex flex-col text-sm">
      <div className="py-1">
        <Link
          className="font-semibold inline-block bg-orange-500 rounded py-1 px-2 text-white"
          href="/products/add"
        >
          + Adauga
        </Link>
      </div>
      <div className="py-1 flex-1">
        <table className="border border-gray-200 border-collapse w-full">
          <thead>
            <tr className="text-xs text-left">
              <th className="border border-gray-200 py-1.5 px-1 text-center w-16">
                Nr. Crt.
              </th>
              <th className="border border-gray-200 py-1.5 px-1">MARCA</th>
              <th className="border border-gray-200 py-1.5 px-1">PROFIL</th>
              <th className="border border-gray-200 py-1.5 px-1">DIMENSIUNI</th>
              <th className="border border-gray-200 py-1.5 px-1">ETICHETA</th>
              <th className="border border-gray-200 py-1.5 px-1">ANOTIMP</th>
              <th className="border border-gray-200 py-1.5 px-1">S/V</th>
              <th className="border border-gray-200 py-1.5 px-1">VANZARE</th>
              <th className="border border-gray-200 py-1.5 px-1">STOC</th>
              <th className="border border-gray-200 py-1.5 px-1 text-center w-20">
                ACTIUNI
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-xs">
              <td className="border border-gray-200 py-0.5 px-1 text-center">
                1
              </td>
              <td className="border border-gray-200 py-0.5 px-1">RIKEN</td>
              <td className="border border-gray-200 py-0.5 px-1">
                SNOWTIME B2
              </td>
              <td className="border border-gray-200 py-0.5 px-1">195/50/15</td>
              <td className="border border-gray-200 py-0.5 px-1">F/E/72</td>
              <td className="border border-gray-200 py-0.5 px-1">Iarna</td>
              <td className="border border-gray-200 py-0.5 px-1">B2/H</td>
              <td className="border border-gray-200 py-0.5 px-1">190.00</td>
              <td className="border border-gray-200 py-0.5 px-1">20</td>
              <td className="border border-gray-200 py-0.5 px-1">
                <div className="flex items-center justify-evenly">
                  <Link
                    className="p-1.5 border border-gray-200 rounded hover:bg-gray-200 duration-500"
                    href="/"
                  >
                    <FaEdit className="text-blue-500" />
                  </Link>
                  <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-200 duration-500">
                    <FaRegTrashAlt className="text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="py-1 flex items-center justify-center font-semibold border-t border-gray-200">
        <FiChevronsLeft className="mr-3" />
        <span>1 / 12</span>
        <FiChevronsRight className="ml-3" />
      </div>
    </div>
  );
};

export default ProductsPage;
