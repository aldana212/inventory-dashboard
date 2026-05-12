import React from "react";
import { Link } from "react-router";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="text-[14px] leading-[20px]">
      <ul className="flex items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.to ? (
              <Link to={item.to} className="text-[#515F74] dark:text-[#94A3B8] sm:text-[16px] text-[12px] hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#004AC6] sm:text-[16px] text-[12px] font-medium">{item.label}</span>
            )}

            {index < items.length - 1 && <span className="dark:text-[#94A3B8]">/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
