import React from "react";
import DragAndDrop from "../components/DragAndDrop";
import Button from "../components/Button";

function Compare() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-y-5 py-20 dark:bg-dark dark:text-light">
      <h5 className="text-2xl font-semibold">
        Get Detailed Comparison of Two Resumes
      </h5>
      <h6 className="text-lg font-light">
        Upload two resumes and get a detailed comparison between them.
      </h6>
      <div className="my-10 flex flex-row gap-x-5">
        <DragAndDrop />
        <DragAndDrop />
      </div>
      <Button color={"peach"}>Compare Resumes</Button>
    </div>
  );
}

export default Compare;
