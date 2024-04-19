"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { revalidate } from "@/utils/revalidate";
import { useParams } from "next/navigation";

const schema = Yup.object().shape({
  brand: Yup.string().required("Introdu marca"),
  stock: Yup.number().required("Introdu stocul").min(1, "Stocul nu poate fi 0"),
  shelf: Yup.string().required("Introdu raftul"),
  slot: Yup.number().required("Introdu slotul").min(1, "Slotul nu poate fi 0"),
});

const EditProductPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);

        const { product } = await res.json();
        setProduct(product);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      brand: "",
      stock: "",
      shelf: "",
      slot: "",
    },

    validationSchema: schema,

    onSubmit: async ({ brand, stock, shelf, slot }) => {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ brand, stock, shelf, slot }),
        });

        if (res.ok) {
          revalidate("/products");
          router.push("/products");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, setFieldValue } =
    formik;

  return (
    <div className="text-sm">
      <div className="border border-gray-200 p-1 w-1/3 mx-auto mt-10">
        <h2 className="text-center text-lg font-semibold my-3">
          Editeaza produs
        </h2>
        <form onSubmit={handleSubmit} className="p-2">
          <div className="my-2">
            <div className="flex justify-between">
              <label
                className="inline-block font-semibold mb-0.5"
                htmlFor="brand"
              >
                Marca*
              </label>
              {errors.brand && touched.brand && (
                <span className="text-red-500">{errors.brand}</span>
              )}
            </div>
            <input
              className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
              type="text"
              id="brand"
              name="brand"
              value={values.brand}
              onChange={handleChange}
              placeholder={product.brand}
            />
          </div>
          <div className="my-2">
            <div className="flex justify-between">
              <label
                className="inline-block font-semibold mb-0.5"
                htmlFor="stock"
              >
                Stoc*
              </label>
              {errors.stock && touched.stock && (
                <span className="text-red-500">{errors.stock}</span>
              )}
            </div>
            <input
              className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
              type="number"
              id="stock"
              name="stock"
              value={values.stock}
              onChange={handleChange}
              placeholder={product.stock}
            />
          </div>
          <div className="my-2 flex justify-between">
            <div>
              <div className="flex justify-between">
                <label
                  className="inline-block font-semibold mb-0.5"
                  htmlFor="shelf"
                >
                  Raft*
                </label>
                {errors.shelf && touched.shelf && (
                  <span className="text-red-500">{errors.shelf}</span>
                )}
              </div>
              <input
                className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
                type="text"
                id="shelf"
                name="shelf"
                value={values.shelf}
                onChange={handleChange}
                placeholder={product.shelf}
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label
                  className="inline-block font-semibold mb-0.5"
                  htmlFor="slot"
                >
                  Slot*
                </label>
                {errors.slot && touched.slot && (
                  <span className="text-red-500">{errors.slot}</span>
                )}
              </div>
              <input
                className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
                type="number"
                id="slot"
                name="slot"
                value={values.slot}
                onChange={handleChange}
                placeholder={
                  product && product.slot && (product.slot + 1).toString()
                }
              />
            </div>
          </div>
          <div className="mt-3 text-right">
            <Link
              href="/products"
              className={`${
                loading && "brightness-50 pointer-events-none"
              } font-semibold inline-block bg-black rounded py-1.5 px-4 text-white hover:bg-neutral-700 duration-500 mr-4`}
            >
              - Anulare
            </Link>
            <button
              disabled={loading}
              type="submit"
              className="disabled:brightness-50 font-semibold inline-block bg-orange-500 rounded py-1.5 px-4 text-white enabled:hover:bg-orange-700 duration-500"
            >
              + Salveaza
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
