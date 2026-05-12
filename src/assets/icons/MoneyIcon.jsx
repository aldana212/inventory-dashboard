import React from "react";

const MoneyIcon = ({ className }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="currentColor"
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
        <h3>Money</h3>{" "}
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          {" "}
          <g id="Money">
            {" "}
            <rect
              id="Rectangle"
              fillRule="nonzero"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              {" "}
            </rect>{" "}
            <rect
              id="Rectangle"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              x="4"
              y="6"
              width="14"
              height="10"
              rx="2"
            >
              {" "}
            </rect>{" "}
            <path
              d="M21,9 L21,17 C21,18.1046 20.1046,19 19,19 L7,19"
              id="Path"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {" "}
            </path>{" "}
            <circle
              id="Oval"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              cx="11"
              cy="11"
              r="2"
            >
              {" "}
            </circle>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};

export default MoneyIcon;
