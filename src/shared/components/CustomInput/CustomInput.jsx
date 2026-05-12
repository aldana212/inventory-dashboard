import React, { useState } from "react";
import ProductIcon from "../../../assets/icons/productIcon";
import EyeOpenIcon from "../../../assets/icons/EyeOpenIcon";
import EyeCloseIcon from "../../../assets/icons/EyeCloseIcon";

const CustomInput = ({
  type = "text",
  name = "custom",
  value,
  label,
  onChange,
  placeholder,
  icon,
  disabled = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`w-full h-auto flex flex-col items-start ${label && "gap-[8px]"} `}
    >
      <label
        htmlFor=""
        className="sm:text-[12px] text-[11px] text-[#515F74] dark:text-[#F1F5F9] sm:leading-[20px] leading-[16px] font-medium"
      >
        {label}
      </label>
      {/* <div clas>

      </div> */}
      <label
        htmlFor={name}
        className={`relative w-full outline-none sm:h-[44px] h-[40px] bg-[#F2F4F6] dark:bg-[#051424] border border-[#F2F4F6] dark:border-[#0D1C2D] ${!disabled && "hover:border-[#0066FF]"}  flex justify-start items-center gap-[6px] sm:p-[16px] p-[12px] rounded-[8px] cursor-pointer transition-all duration-300`}
      >
        {icon && icon}
        <input
          type={showPassword ? "text" : type}
          value={value}
          name={name}
          id={name}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
         className="
    w-full
    outline-none

    text-[16px]

    scale-[0.75]
    sm:scale-100

    origin-left

    dark:text-[#E5E7EB]
    placeholder:text-[#6B7280]
    dark:placeholder:text-[#94A3B8]
  "
        />
        {type === "password" &&
          (!showPassword ? (
            <EyeOpenIcon
              className="w-[22px] cursor-pointer text-[#0F172A] dark:text-[#F1F5F9]"
              onClick={handleChangePassword}
            />
          ) : (
            <EyeCloseIcon
              className="w-[22px] cursor-pointer text-[#0F172A] dark:text-[#F1F5F9]"
              onClick={handleChangePassword}
            />
          ))}
      </label>
    </div>
  );
};

export default CustomInput;
