import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import AlertModal from "./AlertModal";

function DragAndDrop({ className }) {
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
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
      const message = `Accepted files: ${acceptedFiles
        .map((file) => file.name)
        .join(", ")}`;
      setModalMessage(message);
      setShowModal(true);
    }
  }, []);

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
    <div className={className}>
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-3xl p-20 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
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
