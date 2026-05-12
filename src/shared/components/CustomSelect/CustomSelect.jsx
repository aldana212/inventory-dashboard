import Select, { components } from "react-select";
import { useMobile } from "../../../hooks/useMobile";
import { useTheme } from "../../../hooks/useTheme";

const getSelectStyles = (darkMode) => {
  const colors = {
    bg: darkMode ? "#051424" : "#F0F4F7",
    optionBg: darkMode ? "#374151" : "#FFFFFF",
    text: darkMode ? "#E5E7EB" : "#526170",
    placeholder: darkMode ? "#94A3B8" : "#6B7280",
    border: darkMode ? "#374151" : "transparent",
  };

  return {
    control: (provided) => ({
      ...provided,
      padding: 0,
      backgroundColor: colors.bg,
      borderColor: colors.border,
    }),

    // 🔹 Menú desplegable
    menu: (provided) => ({
      ...provided,
      border: "none",
      borderRadius: "8px",
       backgroundColor: colors.bg,
      padding: "5px",
    }),

    dropdownIndicator: (base, state) => ({
      ...base,
      padding: 0,
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null, // Rotate arrow when open
    }),

    // 🔹 Opciones
    option: (provided, state) => ({
      ...provided,
      borderRadius: "8px",
      backgroundColor:
        state.isSelected || state.isFocused ? colors.optionBg : "transparent",
      "&:hover": {
        backgroundColor: colors.optionBg,
      },
       color: colors.text,
      padding: "10px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: state.isSelected ? "600" : "400",
    }),

    // 🔹 Texto seleccionado
    singleValue: (provided) => ({
      ...provided,
      padding: 0,
      color: colors.text,
      fontSize: "14px", // tamaño
      fontWeight: "500",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: "100%",
    }),

    // 🔹 Placeholder
    placeholder: (provided) => ({
      ...provided,
      padding: 0,
      color: colors.placeholder,
      fontSize: "16px", // tamaño
      fontWeight: "500",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: "100%",
    }),

    // 🔹 Input de búsqueda
    input: (provided) => ({
      ...provided,
      padding: 0,
      color: colors.text,
      fontSize: "16px", // tamaño
      fontWeight: "500",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: 0,
      overflow: "hidden",
    }),
  };
};

const CustomSelect = ({
  options,
  value,
  onChange,
  icono,
  placeholder = "Select...",
  disabled
}) => {
  const { isMobile } = useMobile();
  const { darkMode } = useTheme();

  const CustomControl = ({ children, ...controlProps }) => {
    return (
      <div
        {...controlProps.innerProps}
        className="w-full h-[40px] flex items-center gap-[8px] bg-[#F2F4F6] dark:bg-[#051424] border border-[#C3C6D7]/20 dark:border-[#1E293B] rounded-[8px] px-[12px]"
      >
        {icono && icono}
        {/* <div className="w-[14px] h-[14px]">
          </div> */}
        {children}
      </div>
    );
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator
        {...props}
        className="w-[20px] h-[20px] p-0 text-[#6B7280] dark:text-[#F1F5F9]"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </components.DropdownIndicator>
    );
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      styles={getSelectStyles(darkMode)}
      placeholder={placeholder}
      isDisabled={disabled}
      components={{
        Control: CustomControl,
        DropdownIndicator,
        IndicatorSeparator: () => null,
      }}
      menuPlacement={isMobile ? "top" : "bottom"}
    />
  );
};

export default CustomSelect;
