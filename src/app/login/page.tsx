"use client";

import { Box } from "@/components/Box";
import { Main } from "@/components/Container";
import { Input } from "@/components/Input";
import { validateEmail, validatePassword } from "@/utils/validators";
import React, { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const validationError = validateEmail(email!);
        if (validationError) {
            setError(validationError);
            return;
        }
        
        setError("");
        alert("Form Submitted with" + email)
    }
    
    return(
        <Main>
            <Box>
                <form onSubmit={handleSubmit}>
                    <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your working Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error}
                    />

                    <button className="w-full bg-green-600 text-gray-800 py-2 rounded-md hover:bg-green-600">
                        Submit
                    </button>
                </form>
            </Box>
        </Main>
    )
}