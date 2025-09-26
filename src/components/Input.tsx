import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

type InputProps = {
    label?: string;
    error?: string;
    showToggle?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>

export function Input({label, error, className, showToggle = true, type, ...props}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    return(
        <div className="m-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
            <input {...props} type={inputType} 
            className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"} ${className ?? ""}`}/>
            {isPassword && showToggle && (
                <button type="button" onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            )}
            </div>
            {error && (<p className="mt-1 text-xs text-red-600">{error}</p>)}
        </div>
    );
} 