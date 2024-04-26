"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { revalidate } from "@/utils/revalidate";
import { TfiClose } from "react-icons/tfi";
import { CgSpinner } from "react-icons/cg";
import Loader from "@/app/components/loader/Loader";

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
  slot: Yup.string().required("Introdu slotul"),
});

const AddProductPage = () => {
  const [shelves, setShelves] = useState([]);
  const [slotsMap, setSlotsMap] = useState(false);
  const [shelfAndSlot, setShelfAndSlot] = useState({ shelf: null, slot: null });
  const [loadingForm, setLoadingForm] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getAllShelves = async () => {
      try {
        const res = await fetch("/api/shelves");

        const shelves = await res.json();
        setShelves(shelves);
      } catch (error) {
        console.log(error);
      } finally {
        setSlotsLoading(false);
      }
    };
    getAllShelves();
  }, []);

  const formik = useFormik({
    initialValues: {
      customerLastname: "",
      customerFirstname: "",
      brand: "",
      stock: 0,
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

        const res = await fetch("http://localhost:3000/api/products", {
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
          const lastPage = await getTotalNumberOfProducts();
          revalidate(`/products?page=${lastPage}`);
          router.push(`/products?page=${lastPage}`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingForm(false);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, setFieldValue } =
    formik;

  const getTotalNumberOfProducts = async () => {
    try {
      const res = await fetch("/api/products");

      const { totalProductsNumber } = await res.json();

      const lastPage = Math.ceil(totalProductsNumber / 20);

      return lastPage;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-sm">
      <div className="border border-gray-200 p-1 w-1/3 mx-auto mt-10">
        {slotsLoading ? (
          <Loader classname="min-h-96" />
        ) : (
          <>
            <h2 className="text-center text-lg font-semibold my-3">
              Adauga produs
            </h2>
            <form onSubmit={handleSubmit} className="p-2">
              <div className="my-2">
                <div className="flex justify-between">
                  <label
                    className="inline-block font-semibold mb-0.5"
                    htmlFor="customerLastname"
                  >
                    Nume client*
                  </label>
                  {errors.customerLastname && touched.customerLastname && (
                    <span className="text-red-500">
                      {errors.customerLastname}
                    </span>
                  )}
                </div>
                <input
                  className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
                  type="text"
                  id="customerLastname"
                  name="customerLastname"
                  value={values.customerLastname}
                  onChange={handleChange}
                />
              </div>
              <div className="my-2">
                <div className="flex justify-between">
                  <label
                    className="inline-block font-semibold mb-0.5"
                    htmlFor="customerFirstname"
                  >
                    Prenume client*
                  </label>
                  {errors.customerFirstname && touched.customerFirstname && (
                    <span className="text-red-500">
                      {errors.customerFirstname}
                    </span>
                  )}
                </div>
                <input
                  className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
                  type="text"
                  id="customerFirstname"
                  name="customerFirstname"
                  value={values.customerFirstname}
                  onChange={handleChange}
                />
              </div>
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
                />
              </div>
              <div className="my-2">
                <div className="flex justify-between">
                  <span className="inline-block font-semibold mb-0.5">
                    Alege raftul si slotul*
                  </span>
                  {errors.slot && touched.slot && (
                    <span className="text-red-500 text-right">
                      {errors.slot}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSlotsMap(true)}
                  className="flex items-center font-semibold border border-gray-200 rounded-sm py-0.5 px-2"
                >
                  <span
                    className={`${
                      shelfAndSlot.shelf !== null &&
                      shelfAndSlot.slot !== null &&
                      "text-green-600"
                    }`}
                  >
                    Raft:{" "}
                    {shelfAndSlot && shelfAndSlot.shelf !== null
                      ? shelfAndSlot.shelf
                      : "-"}{" "}
                    / Slot:{" "}
                    {shelfAndSlot && shelfAndSlot.slot !== null
                      ? shelfAndSlot.shelf + (shelfAndSlot.slot + 1)
                      : "-"}
                  </span>
                </button>
                {shelfAndSlot.shelf !== null && shelfAndSlot.slot !== null && (
                  <span className="text-xs italic">
                    Click mai sus pentru a modifica
                  </span>
                )}
                {slotsMap && (
                  <div className="absolute w-[100vw] h-[100vh] top-0 left-0 grid place-items-center bg-black/60 z-20">
                    <fieldset className="bg-white border border-gray-200 rounded p-4 z-10 min-w-96 min-h-96">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-semibold text-base">
                          Selecteaza slotul si inchide caseta:
                        </span>
                        <button
                          className="border border-gray-400 p-1.5 rounded group"
                          type="button"
                          onClick={() => setSlotsMap(false)}
                        >
                          <TfiClose
                            strokeWidth={0.4}
                            className="text-gray-600 group-hover:text-red-700 duration-300"
                          />
                        </button>
                      </div>
                      {slotsLoading ? (
                        <div className="min-h-72 grid place-items-center">
                          <CgSpinner className="animate-spin text-2xl" />
                        </div>
                      ) : (
                        <>
                          {shelves.map((shelf, shelfIndex) => (
                            <div
                              className="flex items-stretch mb-1 min-h-20"
                              key={shelfIndex}
                            >
                              <div className="relative">
                                <label
                                  className={`inline-flex items-center justify-center bg-white border border-gray-500 min-w-16 h-full font-bold cursor-pointer mr-0.5 duration-300 rounded-sm ${
                                    values.shelf === shelf.number
                                      ? "!bg-gray-600 text-white !border-gray-950"
                                      : ""
                                  }`}
                                  htmlFor={`shelf-${shelf.number}`}
                                >
                                  Raft {shelf.number}
                                </label>
                                <input
                                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
                                  type="radio"
                                  id={`shelf-${shelf.number}`}
                                  name="shelf"
                                  value={shelf.number}
                                  onChange={handleChange}
                                  checked={values.shelf === shelf.number}
                                />
                              </div>
                              {shelf.slots.map((slot, slotIndex) => (
                                <div className="relative" key={slotIndex}>
                                  <label
                                    onClick={() =>
                                      setShelfAndSlot({
                                        shelf: shelf.number,
                                        slot: slotIndex,
                                      })
                                    }
                                    className={`${
                                      slot
                                        ? "bg-red-600 border border-red-950 hover:bg-red-700 pointer-events-none opacity-80"
                                        : "bg-green-700 border border-green-950 hover:bg-green-800"
                                    } inline-flex items-center justify-center border border-b cursor-pointer text-white font-bold duration-300 mx-0.5 min-w-12 h-full rounded-sm ${
                                      parseInt(values.slot) === slotIndex &&
                                      values.shelf === shelf.number
                                        ? "!bg-orange-500 !border-orange-950"
                                        : ""
                                    }`}
                                    htmlFor={`slot-${shelfIndex}-${slotIndex}`}
                                  >
                                    {shelf.number + (slotIndex + 1)}
                                  </label>
                                  <input
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
                                    type="radio"
                                    id={`slot-${shelfIndex}-${slotIndex}`}
                                    name="slot"
                                    value={slotIndex}
                                    onChange={(e) => {
                                      handleChange(e);
                                      const selectedShelf =
                                        shelves[shelfIndex].number;
                                      setFieldValue("shelf", selectedShelf);
                                    }}
                                    checked={
                                      parseInt(values.slot) === slotIndex &&
                                      values.shelf === shelf.number
                                    }
                                    disabled={slot}
                                  />
                                </div>
                              ))}
                            </div>
                          ))}
                        </>
                      )}
                    </fieldset>
                  </div>
                )}
              </div>
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
                  + Adauga
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddProductPage;
