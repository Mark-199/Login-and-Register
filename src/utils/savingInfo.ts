// Hash function (SHA-256)
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Save hashed email + password with expiry
export async function setWithExpiry(
  key: string,
  email: string,
  password: string,
  ttl = 24 * 60 * 60 * 1000
) {
  const hashedEmail = await sha256(email);
  const hashedPassword = await sha256(password);
  const now = new Date();

  const item = {
    email: hashedEmail,
    value: hashedPassword,
    expiry: now.getTime() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

// Get hashed values if not expired
export function getWithExpiry(key: string) {
  if (typeof window === "undefined") return null;
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return { email: item.email, value: item.value };
}
