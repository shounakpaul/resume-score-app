import React from "react";
import Button from "./Button";

const AlertModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-center">
      <div className="bg-black opacity-50 absolute inset-0"></div>
      <div className="bg-white rounded-3xl shadow-lg p-6 relative z-10 dark:bg-dark">
        <h2 className="text-xl font-semibold mb-4 text-center">Message</h2>
        <p className="mb-4 px-10 py-5 text-center">{message}</p>
        <Button color="peach" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default AlertModal;
