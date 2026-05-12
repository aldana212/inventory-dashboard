import React from "react";

const EllipsisIcon = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...rest}
    >
      <path
        d="M2.40002 8C2.40002 7.33726 2.93728 6.8 3.60002 6.8C4.26277 6.8 4.80002 7.33726 4.80002 8C4.80002 8.66274 4.26277 9.2 3.60002 9.2C2.93728 9.2 2.40002 8.66274 2.40002 8Z"
        fill="currentColor"
      />
      <path
        d="M6.80002 8C6.80002 7.33726 7.33728 6.8 8.00002 6.8C8.66277 6.8 9.20003 7.33726 9.20003 8C9.20003 8.66274 8.66277 9.2 8.00002 9.2C7.33728 9.2 6.80002 8.66274 6.80002 8Z"
        fill="currentColor"
      />
      <path
        d="M12.4 6.8C11.7373 6.8 11.2 7.33726 11.2 8C11.2 8.66274 11.7373 9.2 12.4 9.2C13.0628 9.2 13.6 8.66274 13.6 8C13.6 7.33726 13.0628 6.8 12.4 6.8Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default EllipsisIcon;
