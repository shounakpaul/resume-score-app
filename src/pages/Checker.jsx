import React, { useState } from "react";
import DragAndDrop from "../components/DragAndDrop";
import Button from "../components/Button";
import AnalysisModal from "../components/AnalysisModal";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function Checker() {
  const [jobDescription, setJobDescription] = useState("");
  const [fileSelected, setFileSelected] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [analysisMessage, setAnalysisMessage] = useState("");
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Spinner animation variants
  const spinTransition = {
    repeat: Infinity,
    duration: 1,
    ease: "linear",
  };

  const handleTextareaChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleFileSelect = (isSelected, fileName) => {
    setFileSelected(isSelected);
    setUploadedFileName(fileName);
  };

  const handleAnalyzeClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/analyze`,
        {
          jd: jobDescription,
          resume: uploadedFileName,
        }
      );

      setAnalysisMessage(response.data);
      setShowAnalysisModal(true);
    } catch (error) {
      setAnalysisMessage("Analysis failed.");
      setShowAnalysisModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFields = () => {
    setJobDescription("");
    setFileSelected(false);
    setUploadedFileName("");
  };

  const closeModal = () => {
    setShowAnalysisModal(false);
    setAnalysisMessage("");
  };

  const isButtonEnabled =
    jobDescription.trim() !== "" && fileSelected && !isLoading;

  return (
    <div className="flex flex-col items-center justify-center text-center gap-y-5 py-20 dark:bg-dark dark:text-light px-5">
      <h5 className="text-2xl font-semibold">
        Get Expert Level Resume Feedback in Seconds
      </h5>
      <h6 className="text-lg font-light">
        Upload your resume along with the Job Description and get a detailed
        analysis of your resume quality.
      </h6>
      <textarea
        className="md:w-1/2 w-5/6  h-40 resize-none rounded-3xl p-5 border-2 border-dark/10 dark:border-light/60 dark:bg-dark dark:text-light"
        placeholder="Paste the Job Description here"
        value={jobDescription}
        onChange={handleTextareaChange}
      ></textarea>
      <DragAndDrop
        className="my-10"
        onFileSelect={(isSelected, fileName) =>
          handleFileSelect(isSelected, fileName)
        }
        clearFile={fileSelected}
      />
      <div className="flex flex-row items-center justify-center gap-5">
        <div className="relative">
          <Button
            color={"peach"}
            disabled={!isButtonEnabled}
            onClick={handleAnalyzeClick}
          >
            {isLoading ? (
              <div className="flex items-center">
                <motion.span
                  className="inline-block w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={spinTransition}
                />
                <span className="ml-2">Analyzing...</span>
              </div>
            ) : (
              "Analyze Resume"
            )}
          </Button>
        </div>
        <Button color={"peach"} onClick={handleClearFields}>
          Clear All
        </Button>
      </div>
      <AnimatePresence>
        {showAnalysisModal && (
          <AnalysisModal message={analysisMessage} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Checker;
