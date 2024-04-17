"use client";

import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const schema = Yup.object().shape({
  shelves: Yup.number()
    .required()
    .min(1, "Introdu numarul de rafturi (nu poate ramane 0)")
    .max(25, "Numarul de rafturi nu poate dpasi 25"),
  slots: Yup.number()
    .required()
    .min(1, "Introdu numarul de sloturi (nu poate ramane 0)")
    .max(10, "Numarul de sloturi nu poate depasi 10"),
});

const GeneralSettingsPage = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      shelves: 0,
      slots: 0,
    },

    validationSchema: schema,

    onSubmit: async ({ shelves, slots }) => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:3000/api/settings/general", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ shelves, slots }),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="h-full text-sm">
      <div className="py-1">
        <h2 className="text-lg font-semibold">Setari generale</h2>
      </div>
      <div className="py-1 w-1/3 border border-gray-200 rounded">
        <div>
          <form onSubmit={handleSubmit} className="p-2">
            <div className="my-2">
              <div className="flex justify-between">
                <label
                  className="inline-block font-semibold mb-0.5"
                  htmlFor="shelves"
                >
                  Rafturi
                </label>
                {errors.shelves && touched.shelves && (
                  <span className="text-red-500 ml-2">{errors.shelves}</span>
                )}
              </div>
              <input
                className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
                type="text"
                id="shelves"
                name="shelves"
                value={values.shelves}
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <div className="flex justify-between">
                <label
                  className="inline-block font-semibold mb-0.5"
                  htmlFor="slots"
                >
                  Sloturi
                </label>
                {errors.slots && touched.slots && (
                  <span className="text-red-500 ml-2">{errors.slots}</span>
                )}
              </div>
              <input
                className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
                type="number"
                id="slots"
                name="slots"
                value={values.slots}
                onChange={handleChange}
              />
            </div>
            <div className="mt-3 text-right">
              <button
                disabled={loading}
                type="submit"
                className="disabled:brightness-50 font-semibold inline-block bg-orange-500 rounded py-1.5 px-4 text-white enabled:hover:bg-orange-700 duration-500"
              >
                Seteaza
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsPage;
