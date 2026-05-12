import { useState, useRef, useEffect } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";
import CloseIcon from "../../../assets/icons/CloseIcon";

const DatePickerInput = ({ mode = "single", value, onChange, icono, disabled }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const defaultClassNames = getDefaultClassNames();

  // cerrar cuando haces click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const date =
    value?.from && value?.to
      ? `${value.from.toLocaleDateString("es-CO")} - ${value.to.toLocaleDateString("es-CO")}`
      : value?.toLocaleDateString("es-CO");

  return (
    <div
      htmlFor="date"
      className="relative w-full bg-[#F2F4F6] dark:bg-[#051424] border border-[#C3C6D7]/20 dark:border-[#1E293B] rounded-[8px]  flex items-center gap-[10px] px-[12px]"
      ref={ref}
    >
      <label htmlFor="date" className="w-full flex items-center gap-[10px]">
        {icono}

        {/* INPUT */}
        <input
          type="text"
          readOnly
          id="date"
          name="date"
          value={date ? date : ""}
          placeholder="Selecciona una fecha"
          onClick={() => setOpen(true)}
          disabled={disabled}
          className="w-full h-[40px]  outline-none text-[14px] font-medium text-[#526170]"
        />
      </label>
      <div
        className="w-[15px] h-[15x] flex justify-center items-center cursor-pointer"
        onClick={() => onChange(null)}
      >
        <CloseIcon className="text-[#526170]" />
      </div>

      {/* CALENDARIO */}
      {open && (
        <div className="absolute left-0 z-10 mt-2 md:top-full md:bottom-auto rounded-[16px] bg-white dark:bg-[#051424] border border-transparent dark:border-[#1E293B]">
          <DayPicker
            mode={mode}
            selected={value}
            onSelect={(selected) => {
              onChange(selected);
              // setOpen(false);
            }}
            classNames={{
              root: `${defaultClassNames.root} shadow-lg p-5 rounded-[16px] dark:text-[#F1F5F9]`,
              day: "rounded-lg hover:bg-[#F2F4F6] hover:dark:bg-[#0D1C2D] hover:text-[#526170] hover:dark:text-[#F1F5F9] dark:text-[#F1F5F9]",
              chevron: ` fill-[#24667F] dark:fill-[#F1F5F9]`,
              selected: `bg-[#004AC6] text-white `,
              today: "text-[#24667F]",
              range_start: "rounded-lg",
              range_end: "rounded-lg ",
              range_middle: "!bg-[#F2F4F6] dark:!bg-[#0D1C2D] !text-[#526170] dark:!text-[#F1F5F9]",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerInput;
