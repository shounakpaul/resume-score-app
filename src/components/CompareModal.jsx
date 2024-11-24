import React, { useRef } from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CompareModal = ({ message, onClose }) => {
  const scores1 = message.comparison.scores.resume1;
  const scores2 = message.comparison.scores.resume2;
  const detailedSummary = message.comparison.detailed_summary;
  const finalSummary = message.comparison.final_summary;
  const contentRef = useRef();

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderDial = (score, label) => (
    <div className="flex flex-col items-center">
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
            animate={{ pathLength: score / 100 }}
            transition={{ duration: 1 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-peach">
          {Math.round(score)}
        </div>
      </motion.div>
      <div
        className="mt-2 text-sm text-center w-24 whitespace-normal"
        style={{ wordBreak: "keep-all" }}
      >
        {toTitleCase(label)}
      </div>
    </div>
  );

  const renderSummary = (summary) => {
    return summary.split("*").map((line, index) => (
      <p key={index} className="mb-2">
        {line.trim()}
      </p>
    ));
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
      pdf.save("comparison_analysis.pdf");
    });
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 text-center dark:text-light"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-black opacity-50 absolute inset-0"></div>
      <motion.div
        className="bg-white rounded-3xl shadow-lg p-6 relative z-10 md:max-h-[80%] max-h-[85%] overflow-y-auto md:w-[70%] w-[85%] dark:bg-dark"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Comparison</h2>
        <div className="flex justify-center gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Resume 1</h3>
            {Object.keys(scores1).map((section) => (
              <div key={section} className="mb-4">
                {renderDial(scores1[section].overall_score, section)}
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resume 2</h3>
            {Object.keys(scores2).map((section) => (
              <div key={section} className="mb-4">
                {renderDial(scores2[section].overall_score, section)}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 px-2 md:px-4 md:py-5 py-2 text-center">
          <h3 className="text-lg font-semibold mb-4">Section-wise Summary</h3>
          {renderSummary(detailedSummary)}
        </div>
        <div className="mt-8 px-2 md:px-10 md:py-5 py-2 text-center">
          <h3 className="text-lg font-semibold mb-4">Final Summary</h3>
          {renderSummary(finalSummary)}
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

export default CompareModal;
