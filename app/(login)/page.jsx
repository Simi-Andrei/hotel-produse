"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowRightToBracket } from "react-icons/fa6";
import Title from "@/app/components/title/Title";
import Input from "@/app/components/input/Input";
import Form from "@/app/components/form/Form";
import PrimaryButton from "@/app/components/primaryButton/PrimaryButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingForm, setLoadingForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingForm(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Credentiale invalide!");
        setLoadingForm(false);
        return;
      }
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full grid place-items-center text-sm p-2">
      <div className="border border-gray-200 w-full sm:max-w-96 rounded">
        <Title title="Login" />
        <Form onSubmit={handleSubmit}>
          <Input
            label="Email"
            idName="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <Input
              label="Parola"
              idName="password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && (
              <button
                type="button"
                onClick={() => setShowPassword((prevState) => !prevState)}
                className="text-base absolute right-1 top-1/2 p-1 opacity-65"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-6 text-center">
            <PrimaryButton
              className="inline-flex items-center justify-center"
              role="button"
              label={
                <>
                  <FaArrowRightToBracket />
                  &nbsp; Login
                </>
              }
              type="submit"
              disabled={loadingForm}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
