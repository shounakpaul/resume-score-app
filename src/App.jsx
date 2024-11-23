import React from "react";
import DragAndDrop from "./components/DragAndDrop";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="p-20">
        <DragAndDrop text="Drag me!" />
      </div>
    </>
  );
}

export default App;
