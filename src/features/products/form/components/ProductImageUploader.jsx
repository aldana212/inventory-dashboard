/* eslint-disable react-hooks/set-state-in-effect */
import React, { useRef, useState } from "react";
import PhotoUploadIcon from "../../../../assets/icons/PhotoUploadIcon";
import CloseIcon from "../../../../assets/icons/CloseIcon";
import { useEffect } from "react";

const ProductImageUploader = ({ onChangeImg, files }) => {
  const [images, setImages] = useState(Array(6).fill(null));

  const [currentIndex, setCurrentIndex] = useState(null);

  const inputFileRef = useRef(null);

  useEffect(() => {
    if (!files || files.length === 0) {
      setImages(Array(6).fill(null));
      return;
    }

    setImages(() => {
      const base = Array(6).fill(null);

      files?.forEach((img, index) => {
        if (index < 6) {
          const position = img?.position || index;
          base[position] = {
            ...img,
          };
        }
      });

      return base;
    });
  }, [files]);

  const handleImageUploadClick = (index) => {
    inputFileRef.current.click();
    setCurrentIndex(index);
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const newImages = [...images];

    files.forEach((file, i) => {
      const index = currentIndex + i;

      if (index < newImages.length) {
        const existing = newImages[index]?.publicId ? true : false;
        const status = newImages[index]?.publicId ? "replace" : "new";
        newImages[index] = {
          ...newImages[index],
          existing,
          url: URL.createObjectURL(file),
          file,
          status,
        };
      }
    });

    setImages(newImages);

    const onlyFiles = newImages.filter((img) => img !== null).map((img) => img);

    onChangeImg(onlyFiles.length ? onlyFiles : undefined);

    e.target.value = "";
  };

  const handleDelete = (index) => {
    const newImages = [...images];
    // newImages[index] = null;
    newImages[index] = {
      ...newImages[index],
      status: "delete",
    };

    const onlyFiles = newImages.filter((img) => img !== null).map((img) => img);

    setImages(newImages);

    onChangeImg(onlyFiles.length ? onlyFiles : undefined);
  };

  return (
    <div className="w-full flex flex-col gap-[12px]">
      <input
        type="file"
        id="dropzone-file"
        accept="image/png, image/jpeg"
        ref={inputFileRef}
        className="hidden"
        onChange={handleUpload}
      />
      <div
        onClick={() => handleImageUploadClick(0)}
        className={`w-full h-[283.34px] bg-[#FFFFFF] dark:bg-[#0D1C2D] flex flex-col items-center justify-center border ${images[0] ? "border-none" : "border-dashed"} border-[#C3C6D7] dark:border-[#1E293B] rounded-[12px] gap-[16px] cursor-pointer`}
      >
        {images[0] ? (
          <img
            src={images[0]?.url}
            alt="preview"
            className="w-full h-full object-cover rounded-[12px]"
          />
        ) : (
          <>
            <div className="w-[30px] h-[30px] flex justify-center items-center ">
              <PhotoUploadIcon className="text-[#CBD5E1]" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-[14px] text-[#64748B] leading-[20px] font-medium">
                Subir imagen del producto
              </h3>
              <p className="text-[12px] text-[#94A3B8] leading-[16px]">
                PNG, JPG hasta 5MB
              </p>
            </div>
          </>
        )}

        {/* ERROR */}
        {/* {fieldState.error && (
          <p className="text-red-500 text-sm mt-2">
            {fieldState.error.message}
          </p>
        )} */}
      </div>
      <div className="w-full flex items-center hidden gap-[8px]">
        {images.slice(1).map((img, i) => {
          const indexReal = i + 1;
          let disabled = images[indexReal - 1] !== null;

          return (
            <div className="relative" key={indexReal}>
              <button
                disabled={!disabled}
                className={`w-[50px] h-[50px] bg-[#FFFFFF] dark:bg-[#0D1C2D] flex flex-col items-center disabled:opacity-30 justify-center border ${images[indexReal]?.status !== "delete" ? "border-none" : "border-dashed"} border-[#C3C6D7] dark:border-[#1E293B] rounded-[12px] gap-[16px] cursor-pointer`}
                onClick={() => handleImageUploadClick(indexReal)}
              >
                {img && img?.status !== "delete" ? (
                  <img
                    src={img?.url}
                    alt="preview"
                    className="w-full h-full object-cover rounded-[12px]"
                  />
                ) : (
                  <span className="dark:text-[#C3C6D7]">+</span>
                )}
              </button>
              {img && img?.status !== "delete" && (
                <button
                  className="absolute -right-2 -top-2 w-[20px] h-[20px] p-[5px] bg-[#F2F4F6] rounded-full"
                  onClick={() => handleDelete(indexReal)}
                >
                  <CloseIcon className="text-[#191C1E]" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImageUploader;
