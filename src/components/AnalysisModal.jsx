import React, { useRef } from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const AnalysisModal = ({ message, onClose }) => {
  const scores = message.scores;
  const summaries = message.summaries;
  const contentRef = useRef();

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const downloadPDF = () => {
    const input = contentRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume_analysis.pdf");
    });
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
        className="bg-white rounded-3xl shadow-lg p-6 relative z-10 md:max-h-[80%] max-h-[85%] overflow-y-auto md:w-[70%] w-[85%] dark:bg-dark "
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Your Resume Analysis
        </h2>
        <div ref={contentRef} className="mb-4 px-4 py-5 text-center">
          {Object.keys(scores).map((section) => (
            <div key={section} className="mb-4">
              <h3 className="text-lg font-semibold mb-4">{section}</h3>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                {Object.keys(scores[section]).map((score) => (
                  <div key={score} className="flex flex-col items-center">
                    <motion.div
                      className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gray-200"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg className="absolute inset-0 w-full h-full">
                        <circle
                          className="text-gray-300"
                          strokeWidth="4"
                          stroke="currentColor"
                          fill="transparent"
                          r="36"
                          cx="50%"
                          cy="50%"
                        />
                        <motion.circle
                          className="text-peach"
                          strokeWidth="4"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="36"
                          cx="50%"
                          cy="50%"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: scores[section][score] / 100 }}
                          transition={{ duration: 1 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-peach">
                        {Math.round(scores[section][score])}
                      </div>
                    </motion.div>
                    <div
                      className="mt-2 text-sm text-center w-24 whitespace-normal"
                      style={{ wordBreak: "keep-all" }}
                    >
                      {toTitleCase(score)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-center">
                {summaries[section]}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Button color="peach" onClick={downloadPDF}>
            Download as PDF
          </Button>
          <Button color="peach" onClick={onClose} className="ml-4">
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnalysisModal;
