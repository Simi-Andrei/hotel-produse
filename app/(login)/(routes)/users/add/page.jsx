"use client";

import { revalidate } from "@/utils/revalidate";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const AddUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingForm, setLoadingForm] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Te rugam sa completezi toate campurile!");
      return;
    }

    try {
      setLoadingForm(true);
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        revalidate(`/users`);
        router.push(`/users`);
      } else {
        const error = await res.json();
        console.log(error);
        setError(error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingForm(false);
    }
  };

  return (
    <div className="text-sm">
      <div className="border border-gray-200 p-1 w-1/3 mx-auto mt-10">
        <h2 className="text-center text-lg font-semibold my-3">
          Adauga utilizator
        </h2>
        <form onSubmit={handleSubmit} className="p-2">
          <div className="my-2">
            <div className="flex justify-between">
              <label
                className="inline-block font-semibold mb-0.5"
                htmlFor="name"
              >
                Nume
              </label>
            </div>
            <input
              className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
              type="text"
              id="name"
              name="name"
              placeholder="Nume"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-2">
            <div className="flex justify-between">
              <label
                className="inline-block font-semibold mb-0.5"
                htmlFor="email"
              >
                Email
              </label>
            </div>
            <input
              className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-2">
            <div className="flex justify-between">
              <label
                className="inline-block font-semibold mb-0.5"
                htmlFor="password"
              >
                Parola
              </label>
            </div>
            <input
              className="w-full py-1 px-2 rounded-sm focus:outline-gray-300 border border-gray-200 bg-gray-50"
              type="text"
              id="password"
              name="password"
              placeholder="Parola"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-3 text-right">
            <Link
              href="/users"
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
      </div>
    </div>
  );
};

export default AddUserPage;
