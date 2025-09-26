"use client";

import { Box } from "@/components/Box";
import { Main } from "@/components/Container";
import { Input } from "@/components/Input";
import { validateEmail, validatePassword } from "@/utils/validators";
import React, { useState } from "react";
import { verifyLogin } from "@/utils/loginVerify";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [loginError, setLoginError] = useState("");

    const isFormValid = !validateEmail(email) && !validatePassword(password);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const validationEmail = validateEmail(email);
        const validationPassword = validatePassword(password);

        const newErrors: { email?: string; password?: string } = {};
        if (validationEmail) newErrors.email = validationEmail;
        if (validationPassword) newErrors.password = validationPassword;

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const success = await verifyLogin("signupForm", email, password);

            if (success) {
                // ✅ Redirect to dashboard
                router.push("/dashboard");
            } else {
                // ❌ Invalid login
                setLoginError("Invalid email or password.");
            }
        }
    }

    return (
        <Main>
            <Box>
                <h1 className="text-4xl font-sans text-center">LOGO</h1>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                    />
                    
                    <Link href='/signup' className="text-green-300 underline hover:text-green-500">
                    Go to signup
                    </Link>


                    {loginError && <p className="text-red-600 text-sm">{loginError}</p>}

                    <button
                        disabled={!isFormValid}
                        className={`text-white w-full py-2 rounded-md mt-3
              ${isFormValid ? "bg-green-600 hover:bg-green-600" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
                    >
                        Submit
                    </button>
                </form>
            </Box>
        </Main>
    );
}
