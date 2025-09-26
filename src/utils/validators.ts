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

//Email validation
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

// Login validation
export function validatePassword(password: string): string | null {
  if (!password) {
    return "Password is required.";
  }

  return null; // ✅ valid password
}

export function validatePasswordSignUp(password1: string): string | null {
  if (!password1) {
    return "Password is required.";
  }

  if (password1.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  // At least one uppercase letter
  if (!/[A-Z]/.test(password1)) {
    return "Password must contain at least one uppercase letter.";
  }

  // At least one lowercase letter
  if (!/[a-z]/.test(password1)) {
    return "Password must contain at least one lowercase letter.";
  }

  // At least one number
  if (!/[0-9]/.test(password1)) {
    return "Password must contain at least one number.";
  }

  // At least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password1)) {
    return "Password must contain at least one special character.";
  }

  return null; // ✅ valid password
}

// this check if the new password is similar to the value of verify if you know the password  
export function validatePasswordCheck(password1: string, password2: string): string | null {
  if (password2 !== password1) {
    return "Passwords does not match!"}

  return null; // If valid
}