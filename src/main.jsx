import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { AppRoutes } from "./Routes.jsx";

if (!("theme" in localStorage)) {
  localStorage.theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

if (localStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log(import.meta.env.VITE_SERVER_URL);

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <StrictMode>{AppRoutes}</StrictMode>
  </ClerkProvider>
);
