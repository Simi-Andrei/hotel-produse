"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { revalidate } from "@/utils/revalidate";
import { useParams } from "next/navigation";
import Loader from "@/app/components/loader/Loader";
import Form from "@/app/components/form/Form";
import Input from "@/app/components/input/Input";
import Title from "@/app/components/title/Title";

const schema = Yup.object().shape({
  customerLastname: Yup.string()
    .required("Introdu numele")
    .min(3, "Introdu cel putin 3 caractere"),
  customerFirstname: Yup.string()
    .required("Introdu prenumele")
    .min(3, "Introdu cel putin 3 caractere"),
  brand: Yup.string().required("Introdu marca"),
  stock: Yup.number().required("Introdu stocul").min(1, "Stocul nu poate fi 0"),
  shelf: Yup.string().required("Introdu raftul"),
  slot: Yup.number().required("Introdu slotul").min(1, "Slotul nu poate fi 0"),
});

const EditProductPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState({});
  const [shelves, setShelves] = useState({});
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingShelves, setLoadingShelves] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);

        const { product } = await res.json();
        setProduct(product);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingProduct(false);
      }
    };
    const getShelves = async () => {
      try {
        const res = await fetch("/api/shelves");

        const shelves = await res.json();
        setShelves(shelves);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingShelves(false);
      }
    };
    getProduct();
    getShelves();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      customerLastname: "",
      customerFirstname: "",
      brand: "",
      stock: "",
      shelf: "",
      slot: "",
    },

    validationSchema: schema,

    onSubmit: async ({
      customerLastname,
      customerFirstname,
      brand,
      stock,
      shelf,
      slot,
    }) => {
      try {
        setLoadingForm(true);

        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerLastname,
            customerFirstname,
            brand,
            stock,
            shelf,
            slot,
          }),
        });

        if (res.ok) {
          revalidate("/products");
          router.push("/products");
        } else {
          const { error } = await res.json();
          setError(error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingForm(false);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="text-sm">
      <div className="border border-gray-200 p-1 w-1/3 mx-auto mt-10">
        {loadingProduct || loadingShelves ? (
          <Loader classname="min-h-96" />
        ) : (
          <>
            <Title title="Editeaza produs" />
            <Form onSubmit={handleSubmit}>
              <Input
                label="Nume"
                type="text"
                idName="name"
                onChange={handleChange}
                value={values.customerLastname}
                placeholder={product.customerLastname}
              />
              {errors.customerLastname && touched.customerLastname && (
                <span className="text-red-500">{errors.customerLastname}</span>
              )}
              <Input
                label="Prenume"
                type="text"
                idName="customerFirstname"
                onChange={handleChange}
                value={values.customerFirstname}
                placeholder={product.customerFirstname}
              />
              {errors.customerFirstname && touched.customerFirstname && (
                <span className="text-red-500">{errors.customerFirstname}</span>
              )}
              <Input
                label="Marca"
                type="text"
                idName="brand"
                onChange={handleChange}
                value={values.brand}
                placeholder={product.brand}
              />
              {errors.brand && touched.brand && (
                <span className="text-red-500">{errors.brand}</span>
              )}
              <Input
                label="Stoc"
                type="number"
                idName="stock"
                onChange={handleChange}
                value={values.stock}
                placeholder={product.stock}
              />
              {errors.stock && touched.stock && (
                <span className="text-red-500">{errors.stock}</span>
              )}
              <div className="my-2 flex justify-between gap-3">
                <div className="w-full">
                  <div className="flex justify-between">
                    <label
                      className="inline-block font-semibold mb-0.5"
                      htmlFor="shelf"
                    >
                      Raft*{" "}
                      <span className="font-normal italic text-xs">
                        (curent {product.shelf})
                      </span>
                    </label>
                  </div>
                  <select
                    className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50 cursor-pointer"
                    name="shelf"
                    id="shelf"
                    value={values.shelf}
                    onChange={handleChange}
                  >
                    <option
                      className="pointer-events-none text-gray-400"
                      value=""
                    >
                      Alege raftul
                    </option>
                    {shelves.map((shelf, index) => (
                      <option key={index} value={shelf.number}>
                        {shelf.number}
                      </option>
                    ))}
                  </select>
                  {errors.shelf && touched.shelf && (
                    <span className="text-red-500">{errors.shelf}</span>
                  )}
                </div>
                <div className="w-full">
                  <div className="flex justify-between">
                    <label
                      className="inline-block font-semibold mb-0.5"
                      htmlFor="slot"
                    >
                      Slot*
                    </label>
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
                    max={shelves[0].slots.length}
                  />
                  {errors.slot && touched.slot && (
                    <span className="text-red-500">{errors.slot}</span>
                  )}
                </div>
              </div>
              {error && <p className="text-right text-red-500">{error}</p>}
              <div className="mt-3 text-right">
                <Link
                  href="/products"
                  className={`${
                    loadingForm && "brightness-50 pointer-events-none"
                  } font-semibold inline-block bg-black rounded py-1.5 px-4 text-white hover:bg-neutral-700 duration-500 mr-4`}
                >
                  - Anulare
                </Link>
                <button
                  disabled={loadingForm}
                  type="submit"
                  className="disabled:brightness-50 font-semibold inline-block bg-orange-500 rounded py-1.5 px-4 text-white enabled:hover:bg-orange-700 duration-500"
                >
                  + Salveaza
                </button>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProductPage;
