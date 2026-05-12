const Skeleton = ({ className = " w-full h-[20px] " }) => {
  return (
    <div
      className={`
        rounded-[8px]
        animate-pulse
     bg-gray-200 dark:bg-[#051424]
        ${className}
      `}
    />
  );
};

export default Skeleton;
