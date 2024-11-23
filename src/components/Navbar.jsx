import React from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png";
import DarkMode from "./DarkMode";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

function Navbar() {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "px-4 py-2 bg-peach text-light rounded-3xl"
      : "px-4 py-2 hover:bg-peach hover:text-light rounded-3xl";
  };

  return (
    <motion.div
      className="bg-light text-dark py-3 flex flex-row items-center justify-evenly px-10 dark:bg-dark dark:text-light"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to="/"
        className="flex flex-row items-center justify-center px-2 py-1 gap-2"
      >
        <motion.img
          src={Logo}
          alt="Logo"
          className="w-10 h-10"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1 }}
        />
        <p className="logo text-xl text-peach">resumescore</p>
      </Link>

      <SignedIn>
        <motion.div
          className="border-2  rounded-3xl px-4 flex flex-row items-center justify-center gap-x-5 py-1 dark:border-light/20"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/history" className={getLinkClass("/history")}>
            history
          </Link>
          <Link to="/checker" className={getLinkClass("/checker")}>
            checker
          </Link>
          <Link to="/compare" className={getLinkClass("/compare")}>
            compare
          </Link>
        </motion.div>
      </SignedIn>

      <div className="flex flex-row items-center justify-center gap-x-2">
        <SignedOut>
          <SignInButton
            className="border-2 rounded-3xl px-4 py-2 dark:border-light/20"
            mode="modal"
            appearance={{
              baseTheme: localStorage.theme === "dark" ? dark : undefined,
            }}
          />
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              baseTheme: localStorage.theme === "dark" ? dark : undefined,
            }}
          />
        </SignedIn>
        <DarkMode />
      </div>
    </motion.div>
  );
}

export default Navbar;
