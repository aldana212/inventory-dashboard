import React from "react";

const InfoCircleIcon = ({ className }) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
        ></circle>{" "}
        <path
          d="M12 17V11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>{" "}
        <circle
          cx="1"
          cy="1"
          r="1"
          transform="matrix(1 0 0 -1 11 9)"
          fill="currentColor"
        ></circle>{" "}
      </g>
    </svg>
  );
};

export default InfoCircleIcon;
