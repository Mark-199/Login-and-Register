import { Box } from "@/components/Box";
import { Main } from "@/components/Container";
import { Smile } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Dashboard() {
    return(
        <Main>
            <Box>
                <div className="flex">
                <p className=" text-xl bold font-sans mr-1">You are now login as a user </p>
                <Smile className="text-xl mr-7"/>
                <Link href="/login" className="text-2xl p-2 rounded bg-red-700 border border-black hover:bg-red-500 text-white ">Logout</Link>
                </div>
            </Box>
        </Main>
    )
}