"use client";

import { revalidate } from "@/utils/revalidate";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Form from "@/app/components/form/Form";
import Input from "@/app/components/input/Input";
import PrimaryButton from "@/app/components/primaryButton/PrimaryButton";
import SecondaryButton from "@/app/components/secondaryButton/SecondaryButton";

const AddUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
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
        setLoadingForm(false);
      } else {
        const { error } = await res.json();
        console.log(error);
        setError(error);
        setLoadingForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-sm">
      <div className="border border-gray-200 p-1 w-1/3 mx-auto mt-10 rounded">
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
          <div className="mt-6 text-right flex items-center justify-evenly">
            <SecondaryButton
              role="link"
              href="/users"
              label="- Anulare"
              className={loadingForm && "pointer-events-none brightness-90"}
            />
            <PrimaryButton
              role="button"
              type="submit"
              label="+ Adauga"
              disabled={loadingForm}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddUserPage;
