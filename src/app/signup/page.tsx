"use client";

import { Box } from "@/components/Box";
import { Main } from "@/components/Container";
import { Input } from "@/components/Input";
import { validateEmail, validatePasswordCheck, validatePasswordSignUp } from "@/utils/validators";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { setWithExpiry, getWithExpiry } from "@/utils/savingInfo";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password1?: string; password2?: string }>({});
  const [showModal, setShowModal] = useState(false);

  const isFormValid = email.trim() !== "" && password1.trim() !== "" && password2.trim() !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationEmail = validateEmail(email);
    const validationPassword = validatePasswordSignUp(password1);
    let validationPasswordCheck: string | null = null;

    const newErrors: { email?: string; password1?: string; password2?: string } = {};
    if (validationEmail) newErrors.email = validationEmail;
    if (validationPassword) {
      newErrors.password1 = validationPassword;
    } else {
      validationPasswordCheck = validatePasswordCheck(password1, password2);
      if (validationPasswordCheck) newErrors.password2 = validationPasswordCheck;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Save hashed data with expiry
      await setWithExpiry("signupForm", email, password1);

      // Clear form
      setEmail("");
      setPassword1("");
      setPassword2("");

      // Show success modal
      setShowModal(true);
    }
  }

  console.log("Stored hash:", getWithExpiry("signupForm"));

  return (
    <Main>
      <Box>
        <h1 className="text-4xl font-sans text-center">LOGO</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your working email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            error={errors.password1}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Double check your password"
            value={password2}
            showToggle={false}
            onChange={(e) => setPassword2(e.target.value)}
            error={errors.password2}
          />

          <Link href="/login" className="text-green-300 underline hover:text-green-500">
          Go to login
          </Link>

          <button
            disabled={!isFormValid}
            className={`text-white w-full py-2 rounded-md mt-3
              ${isFormValid ? "bg-green-600 hover:bg-green-600" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
          >
            Submit
          </button>
        </form>
      </Box>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Account Created 🎉</h2>
            <p className="mb-6">Your account has been successfully created.</p>
            <button
              onClick={() => router.push("/login")}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </Main>
  );
}
