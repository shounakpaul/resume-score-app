import React from "react";
import { motion } from "framer-motion";

function Button({ color, children, className, onClick, disabled }) {
  if (color === "peach") {
    color = "bg-peach text-white hover:bg-peach/80";
  } else if (color === "white") {
    color = "bg-neutral text-dark hover:bg-neutral/80";
  }

  return (
    <motion.button
      whileHover={{ opacity: 0.8 }}
      whileTap={{ scale: 0.95 }}
      className={`${color} text-white px-4 py-2 rounded-3xl font-semibold ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

export default Button;
