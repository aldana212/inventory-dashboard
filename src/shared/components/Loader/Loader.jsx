import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center">
      {/* barra 1 */}
      <span className="inline-block w-[3px] h-[10px] bg-white/50 rounded-[10px] animate-[scaleY_1s_linear_infinite]"></span>

      {/* barra 2 */}
      <span className="inline-block w-[3px] h-[20px] mx-[5px] bg-white/50 rounded-[10px] animate-[scaleY_1s_linear_infinite] [animation-delay:250ms]"></span>

      {/* barra 3 */}
      <span className="inline-block w-[3px] h-[10px] bg-white/50 rounded-[10px] animate-[scaleY_1s_linear_infinite] [animation-delay:500ms]"></span>
    </div>
  );
};

export default Loader;
