import React, { useState } from "react";
import DragAndDrop from "../components/DragAndDrop";
import Button from "../components/Button";
import CompareModal from "../components/CompareModal";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function Compare() {
  const [jobDescription, setJobDescription] = useState("");
  const [fileSelected1, setFileSelected1] = useState(false);
  const [uploadedFileName1, setUploadedFileName1] = useState("");
  const [fileSelected2, setFileSelected2] = useState(false);
  const [uploadedFileName2, setUploadedFileName2] = useState("");
  const [compareMessage, setCompareMessage] = useState("");
  const [showCompareModal, setShowCompareModal] = useState(false);
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

  const handleFileSelect1 = (isSelected, fileName) => {
    setFileSelected1(isSelected);
    setUploadedFileName1(fileName);
  };

  const handleFileSelect2 = (isSelected, fileName) => {
    setFileSelected2(isSelected);
    setUploadedFileName2(fileName);
  };

  const handleCompareClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/compare`,
        {
          jd: jobDescription,
          resume1: uploadedFileName1,
          resume2: uploadedFileName2,
        }
      );

      setCompareMessage(response.data);
      setShowCompareModal(true);
    } catch (error) {
      setCompareMessage("Comparison failed.");
      setShowCompareModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFields = () => {
    setJobDescription("");
    setFileSelected1(false);
    setUploadedFileName1("");
    setFileSelected2(false);
    setUploadedFileName2("");
  };

  const closeModal = () => {
    setShowCompareModal(false);
    setCompareMessage("");
  };

  const isButtonEnabled =
    jobDescription.trim() !== "" &&
    fileSelected1 &&
    fileSelected2 &&
    !isLoading;

  return (
    <div className="flex flex-col items-center justify-center text-center gap-y-5 py-20 px-5 dark:bg-dark dark:text-light">
      <h5 className="text-2xl font-semibold">
        Get Detailed Comparison of Two Resumes
      </h5>
      <h6 className="text-lg font-light">
        Upload two resumes along with the Job Description and get a detailed
        comparison between them.
      </h6>
      <textarea
        className="w-1/2 h-40 resize-none rounded-3xl p-5 border-2 border-dark/10 dark:border-light/60 dark:bg-dark dark:text-light"
        placeholder="Paste the Job Description here"
        value={jobDescription}
        onChange={handleTextareaChange}
      ></textarea>
      <div className="my-10 flex flex-row gap-x-3">
        <DragAndDrop
          onFileSelect={(isSelected, fileName) =>
            handleFileSelect1(isSelected, fileName)
          }
          clearFile={fileSelected1}
        />
        <DragAndDrop
          onFileSelect={(isSelected, fileName) =>
            handleFileSelect2(isSelected, fileName)
          }
          clearFile={fileSelected2}
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-5">
        <div className="relative">
          <Button
            color={"peach"}
            disabled={!isButtonEnabled}
            onClick={handleCompareClick}
          >
            {isLoading ? (
              <div className="flex items-center">
                <motion.span
                  className="inline-block w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={spinTransition}
                />
                <span className="ml-2">Comparing...</span>
              </div>
            ) : (
              "Compare Resumes"
            )}
          </Button>
        </div>
        <Button color={"peach"} onClick={handleClearFields}>
          Clear All
        </Button>
      </div>
      <AnimatePresence>
        {showCompareModal && (
          <CompareModal message={compareMessage} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Compare;
