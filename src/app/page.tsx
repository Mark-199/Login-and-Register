import { Box } from "@/components/Box";
import { Main } from "@/components/Container";
import Link  from "next/link";
import Image from "next/image";

export default function Home() {
  return (
       <Main>
        <Box>
            <Link
            className="btn bg-green-600 p-2 rounded-xl hover:bg-green-800 text-white font-bold "
            href="/login">
             Login
            </Link>
          </Box>
        </Main>
  );
}
