"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  brand: Yup.string().required("Introdu marca"),
  profile: Yup.string().required("Introdu profilul"),
  dimensions: Yup.string().required("Introdu dimensiunile"),
  label: Yup.string().required("Introdu eticheta"),
  season: Yup.string().required("Introdu anotimpul"),
  speedIndicator: Yup.string().required("Introdu indicele de viteza"),
  sell: Yup.number().required("Introdu pretul").min(1, "Pretul nu poate fi 0"),
  stock: Yup.number().required("Introdu stocul").min(1, "Stocul nu poate fi 0"),
});

const AdaugarePage = () => {
  const formik = useFormik({
    initialValues: {
      brand: "",
      profile: "",
      dimensions: "",
      label: "",
      season: "",
      speedIndicator: "",
      sell: 0,
      stock: 0,
    },
    validationSchema: schema,

    onSubmit: async ({
      brand,
      profile,
      dimensions,
      label,
      season,
      speedIndicator,
      sell,
      stock,
    }) => {
      try {
        const product = {
          brand,
          profile,
          dimensions,
          label,
          season,
          speedIndicator,
          sell,
          stock,
        };

        await fetch("http://localhost:3000/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="py-1 text-sm">
      <div className="border border-gray-200 p-1 w-1/3 mx-auto">
        <h2 className="text-center text-lg font-semibold my-3">
          Adauga produs
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
                <span className="text-red-500 ml-2">{errors.brand}</span>
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
                htmlFor="profile"
              >
                Profil*
              </label>
              {errors.profile && touched.profile && (
                <span className="text-red-500 ml-2">{errors.profile}</span>
              )}
            </div>
            <input
              className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
              type="text"
              id="profile"
              name="profile"
              value={values.profile}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <div className="flex justify-between">
              <label
                className="inline-block font-semibold mb-0.5"
                htmlFor="dimensions"
              >
                Dimensiuni*
              </label>
              {errors.dimensions && touched.dimensions && (
                <span className="text-red-500 ml-2">{errors.dimensions}</span>
              )}
            </div>
            <input
              className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
              type="text"
              id="dimensions"
              name="dimensions"
              value={values.dimensions}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <div className="flex justify-between">
              <label
                className="inline-block font-semibold mb-0.5"
                htmlFor="label"
              >
                Eticheta*
              </label>
              {errors.label && touched.label && (
                <span className="text-red-500 ml-2">{errors.label}</span>
              )}
            </div>
            <input
              className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
              type="text"
              id="label"
              name="label"
              value={values.label}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <div className="flex justify-between">
              <label
                className="inline-block font-semibold mb-0.5"
                htmlFor="season"
              >
                Anotimp*
              </label>
              {errors.season && touched.season && (
                <span className="text-red-500 ml-2">{errors.season}</span>
              )}
            </div>
            <input
              className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
              type="text"
              id="season"
              name="season"
              value={values.season}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <div className="flex justify-between">
              <label
                className="inline-block font-semibold mb-0.5"
                htmlFor="speedIndicator"
              >
                S/V*
              </label>
              {errors.speedIndicator && touched.speedIndicator && (
                <span className="text-red-500 ml-2">
                  {errors.speedIndicator}
                </span>
              )}
            </div>
            <input
              className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
              type="text"
              id="speedIndicator"
              name="speedIndicator"
              value={values.speedIndicator}
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <div className="flex justify-between">
              <label
                className="inline-block font-semibold mb-0.5"
                htmlFor="sell"
              >
                Vanzare*
              </label>
              {errors.sell && touched.sell && (
                <span className="text-red-500 ml-2">{errors.sell}</span>
              )}
            </div>
            <input
              className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
              type="number"
              id="sell"
              name="sell"
              value={values.sell}
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
                <span className="text-red-500 ml-2">{errors.stock}</span>
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
          <div className="mt-3 text-right">
            <Link
              href="/anvelope"
              className="font-semibold inline-block bg-black rounded py-1.5 px-4 text-white hover:bg-neutral-700 duration-500 mr-4"
            >
              - Anulare
            </Link>
            <button
              type="submit"
              className="font-semibold inline-block bg-orange-500 rounded py-1.5 px-4 text-white hover:bg-orange-700 duration-500"
            >
              + Adauga
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdaugarePage;
