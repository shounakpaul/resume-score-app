import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AboutModal from "./AboutModal";
import { useState } from "react";

const MobileNavMenu = ({ onClose }) => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const handleAboutClick = () => {
    setIsAboutModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAboutModalOpen(false);
  };
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-black opacity-50 absolute inset-0"></div>
      <motion.div
        className="bg-white rounded-3xl shadow-lg p-6 relative z-10 dark:bg-dark max-h-[80%] overflow-y-auto w-[80%] text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <div className="flex flex-col items-center justify-center gap-y-2">
          <Link
            to="/checker"
            className="px-4 py-2 hover:bg-peach hover:text-light font-semibold rounded-3xl"
            onClick={onClose}
          >
            checker
          </Link>
          <Link
            to="/compare"
            className="px-4 py-2 hover:bg-peach hover:text-light font-semibold rounded-3xl"
            onClick={onClose}
          >
            compare
          </Link>
          <p
            className="px-4 py-2 hover:bg-peach hover:text-light rounded-3xl cursor-pointer font-semibold"
            onClick={handleAboutClick}
          >
            about
          </p>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-peach text-light font-semibold rounded-3xl"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>

      <AnimatePresence>
        {isAboutModalOpen && <AboutModal onClose={handleCloseModal} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default MobileNavMenu;
