import React from "react";

const ImageOffIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M2 2l20 20"></path>{" "}
        <path d="M9 3h10a2 2 0 012 2v10M3.59 3.59A2 2 0 003 5v14c0 1.1.9 2 2 2h14a2 2 0 001.41-.59"></path>{" "}
        <path d="M9.56 9.56a1.5 1.5 0 01-2.12-2.12"></path>{" "}
        <path d="M21 15l-5-5M5 21l8-8"></path>{" "}
      </g>
    </svg>
  );
};

export default ImageOffIcon;
