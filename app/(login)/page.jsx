"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Credentiale invalide!");
        return;
      }
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full grid place-items-center text-sm">
      <div className="border border-gray-200 p-1 w-1/3 mx-auto mb-44">
        <h2 className="text-center text-lg font-semibold my-3">Login</h2>
        <form onSubmit={handleSubmit} className="p-2">
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
              type="text"
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
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-3 text-center">
            <button
              type="submit"
              className="disabled:brightness-50 font-semibold inline-block bg-orange-500 rounded py-1.5 px-10 text-white enabled:hover:bg-orange-700 duration-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
