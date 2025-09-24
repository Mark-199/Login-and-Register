// Allowed domains (you can expand this list)
const allowedDomains = process.env.NEXT_PUBLIC_ALLOWED_DOMAINS?.split(",") 
|| [
    "gmail.com",
    "proton.me",
    "yahoo.com",
    "outlook.com",
    "icloud.com",
    "hotmail.com",
];

export function validateEmail(email: string): string | null {
  const trimmed = email.trim().toLowerCase();
  const parts = trimmed.split("@");
    if (parts.length < 2) return "Invalid email format.";

  if (!trimmed) {
    return "Email is required.";
  }

  // Basic shape check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return "Please enter a valid email address.";
  }

  // Extract domain part
  const domain = parts[1].toLowerCase();
  if (!allowedDomains.includes(domain)) {
    return `Unsupported email domain: ${domain}`;
  }

  return null; // valid
};

export function validatePassword(password: string): string | null {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  // At least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  // At least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  // At least one number
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }

  // At least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  return null; // ✅ valid password
}
