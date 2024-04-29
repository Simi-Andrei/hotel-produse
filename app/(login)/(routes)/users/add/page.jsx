"use client";

import { revalidate } from "@/utils/revalidate";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Form from "@/app/components/form/Form";
import Input from "@/app/components/input/Input";

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
        <Form onSubmit={handleSubmit}>
          <Input
            label="Nume"
            type="text"
            idName="name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            idName="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Parola"
            type="text"
            idName="password"
            onChange={(e) => setPassword(e.target.value)}
          />
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
        </Form>
      </div>
    </div>
  );
};

export default AddUserPage;
