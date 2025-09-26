# Project #1

### Frontend
<ul>
    <li>Tailwind</li>
</ul>

---

### Documentation

#### Overview
This project is a simple login and registration system built with Next.js for the frontend, styled using Tailwind CSS, and uses data storage.

#### Project Structure
- `src/app/` - Main Next.js app directory
  - `login/` - Login page
  - `signup/` - Registration page
  - `dashboard/` - Protected dashboard page
  - `api/` - API routes (e.g., login)
- `src/components/` - Reusable UI components (Box, Container, Input)
- `src/utils/` - Utility functions (validation, login verification, saving info)

#### Setup Instructions
1. **Install dependencies:**
    ```bash
    pnpm install
    ```
2. **Run the development server:**
    ```bash
    pnpm dev
    ```
    The app will be available at `http://localhost:3000`.

#### Usage
- Visit `/login` to log in.
- Visit `/signup` to register a new account.
- Upon successful login, you will be redirected to `/dashboard`.

#### Customization
- Update styles in `src/app/globals.css` or use Tailwind utility classes.

#### License
This project is for educational purposes.
