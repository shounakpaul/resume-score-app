import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.png";
import DarkMode from "./DarkMode";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import AboutModal from "./AboutModal";
import MobileNavMenu from "./MobileNavMenu";
import { CiMenuFries } from "react-icons/ci";

function Navbar() {
  const location = useLocation();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "px-4 py-2 bg-peach text-light font-semibold rounded-3xl"
      : "px-4 py-2 hover:bg-peach hover:text-light font-semibold rounded-3xl";
  };

  const handleAboutClick = () => {
    setIsAboutModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAboutModalOpen(false);
  };

  const handleMobileNavClick = () => {
    setIsMobileNavOpen(true);
  };

  const handleCloseMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <motion.div
      className="bg-light text-dark py-3 flex flex-row items-center justify-between md:px-10 dark:bg-dark dark:text-light px-5"
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
          className="md:w-10 md:h-10 w-8 h-8"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1 }}
        />
        <p className="logo md:text-xl text-lg text-peach">resumescore</p>
      </Link>

      <div className="hidden md:flex flex-row items-center justify-center gap-x-5">
        <SignedIn>
          <motion.div
            className="border-2 rounded-3xl px-4 flex flex-row items-center justify-center gap-x-5 py-1 dark:border-light/20"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/checker" className={getLinkClass("/checker")}>
                checker
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/compare" className={getLinkClass("/compare")}>
                compare
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <p
                className="px-4 py-2 hover:bg-peach hover:text-light rounded-3xl cursor-pointer font-semibold"
                onClick={handleAboutClick}
              >
                about
              </p>
            </motion.div>
          </motion.div>
        </SignedIn>
      </div>

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
        <SignedIn>
          <button
            className="md:hidden md:px-4 md:py-2 px-3 py-3 bg-peach text-light font-bold rounded-3xl"
            onClick={handleMobileNavClick}
          >
            <CiMenuFries />
          </button>
        </SignedIn>
      </div>

      <AnimatePresence>
        {isAboutModalOpen && <AboutModal onClose={handleCloseModal} />}
        {isMobileNavOpen && <MobileNavMenu onClose={handleCloseMobileNav} />}
      </AnimatePresence>
    </motion.div>
  );
}

export default Navbar;
