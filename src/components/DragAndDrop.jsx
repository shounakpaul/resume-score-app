import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import AlertModal from "./AlertModal";
import axios from "axios";

function DragAndDrop({ className, onFileSelect, clearFile }) {
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  useEffect(() => {
    if (!clearFile) {
      setUploadedFileName("");
    }
  }, [clearFile]);

  const onDrop = useCallback(
    async (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const message = rejectedFiles
          .map((file) => {
            if (file.errors.some((e) => e.code === "file-invalid-type")) {
              return `${file.file.name} is not a PDF file.`;
            }
            if (file.errors.some((e) => e.code === "file-too-large")) {
              return `${file.file.name} is larger than 5MB.`;
            }
            return `${file.file.name} was rejected.`;
          })
          .join("\n");
        setModalMessage(message);
        setShowModal(true);
      } else {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/upload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );

          if (response.status === 200) {
            setUploadedFileName(file.name);
            onFileSelect(true, file.name);
          } else {
            setModalMessage("File upload failed.");
            setShowModal(true);
            onFileSelect(false, "");
          }
        } catch (error) {
          setModalMessage("File upload failed.");
          setShowModal(true);
          onFileSelect(false, "");
        }
      }
    },
    [onFileSelect]
  );

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    maxSize: 5242880, // 5MB in bytes
    multiple: false,
  });

  return (
    <div className={className + " w-full max-w-screen-lg mx-auto"}>
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-3xl text-center cursor-pointer w-full h-60 p-5 flex items-center justify-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : uploadedFileName ? (
          <p>Uploaded file: {uploadedFileName}</p>
        ) : (
          <p>
            Drag 'n' drop your resume here, or click to select files (Max size:
            5MB)
          </p>
        )}
      </div>
      {showModal && <AlertModal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}

export default DragAndDrop;
