import React from "react"

export function Box({children}: {children: React.ReactNode}) {
    return(
        <section className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 sm:w-[90%] md:w-[70%] lg:w-[50%]">
                {children}
            </div>
        </section>
    );
}