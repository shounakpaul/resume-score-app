import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

function DarkMode({ className }) {
  const [isDark, setIsDark] = useState(localStorage.theme === "dark");

  function darkToggle() {
    setIsDark(!isDark);
    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    }
  }

  return (
    <motion.div
      className={
        "flex items-center justify-center p-3 border-2 rounded-full cursor-pointer bg-light dark:bg-dark  dark:border-light/20 " +
        className
      }
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={darkToggle}
      initial={false}
      animate={{ rotate: isDark ? 180 : 0 }}
    >
      {isDark ? (
        <FiSun className="text-xl text-neutral-100" />
      ) : (
        <FiMoon className="text-xl text-neutral-900" />
      )}
    </motion.div>
  );
}

export default DarkMode;
