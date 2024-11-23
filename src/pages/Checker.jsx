import React from "react";
import DragAndDrop from "../components/DragAndDrop";
import Button from "../components/Button";

function Checker() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-y-5 py-20 dark:bg-dark dark:text-light">
      <h5 className="text-2xl font-semibold">
        Get Expert Level Resume Feedback in Seconds
      </h5>
      <h6 className="text-lg font-light">
        Upload your resume and get a detailed analysis of your resume quality.
      </h6>
      <DragAndDrop className="my-10" />
      <Button color={"peach"}>Analyze Resume</Button>
    </div>
  );
}

export default Checker;
