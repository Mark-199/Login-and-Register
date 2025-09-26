import type { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5
});

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  // Run rate limiter
  await new Promise((resolve, reject) => {
    limiter(request, response, (result: any) => (result instanceof Error ? reject(result) : resolve(result)));
  });

  if (request.method !== "POST") return response.status(405).json({ message: "Method not allowed" });

  const { email, password } = request.body;

  // test login 
  if (email === "test@gmail.com" && password === "12345678") {
    return response.status(200).json({ message: "Login successful" });
  }

  return response.status(401).json({ message: "Invalid email or password" });
}