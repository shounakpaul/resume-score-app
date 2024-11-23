import React from "react";

function Button({ color, children, className, onClick }) {
  if (color === "peach") {
    color = "bg-peach text-white hover:bg-peach/80";
  } else if (color === "white") {
    color = "bg-neutral text-dark hover:bg-neutral/80";
  }

  return (
    <button
      className={`${color} text-white px-4 py-2 rounded-3xl ${className}`}
      onClick={onClick}
      color="peach"
    >
      {children}
    </button>
  );
}

export default Button;
