import { sha256, getWithExpiry } from "./savingInfo";

// verify login attempt by comparing stored hashed values
export async function verifyLogin(key: string, email: string, password: string) {
  const stored = getWithExpiry(key);
  if (!stored) return false;

  const hashedEmail = await sha256(email);
  const hashedPassword = await sha256(password);

  return stored.email === hashedEmail && stored.value === hashedPassword;
}
