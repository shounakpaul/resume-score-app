import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import Logo from "../assets/logo.png";

const AboutModal = ({ onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-black opacity-50 absolute inset-0"></div>
      <motion.div
        className="bg-white rounded-3xl shadow-lg p-6 relative z-10 dark:bg-dark max-h-[80%] overflow-y-auto md:w-[50%] w-[85%] text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <div className="flex flex-col items-center justify-center gap-y-2">
          <img src={Logo} alt="Logo" className="w-10 h-10" />
          <p className="logo text-xl font-semibold mb-4 text-center text-peach">
            resumescore
          </p>
        </div>
        <p className="mb-4 px-10 py-5 text-center">
          This open-source project aims to help job seekers improve their
          resumes by providing detailed analysis and comparison of their resumes
          with the job description. The project is built using React, Tailwind
          CSS, and Clerk.dev for authentication.
        </p>
        <div className="flex flex-row gap-x-5 items-center justify-center">
          <Button color="peach" onClick={onClose}>
            Close
          </Button>
          <a href="https://github.com/shounakpaul/resume-score-app.git">
            <Button color="peach">GitHub</Button>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutModal;
