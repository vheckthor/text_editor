import React, { useContext, useRef } from "react";
import { EditorContext } from "../../context/EditorContext";
import { PictureProps } from "../../types/interfaces";
import EmbedModal from "../EmbedModal";

const Picture: React.FC<PictureProps> = ({ onFileChange, isOpen, isClose }) => {
  const { incrementWordCount } = useContext(EditorContext);
  const ref = useRef<HTMLInputElement>(null);

  const handleFileChange = () => {
    const file = ref.current?.files?.[0];
    if (file) {
      onFileChange(file);
      isClose();
      incrementWordCount();
    }
  };

  return (
    <EmbedModal
      isOpen={isOpen}
      isClose={isClose}
      title="Picture"
      onConfirm={handleFileChange}
      confirmButtonText="Embed"
    >
      <div className="px-3">
        <p className="mb-2 text-[14px]">Upload Image</p>
        <small className="text-[10px] uppercase">File upload</small>
        <div className="bg-[#FAFAFA] border border-dashed border-green-700 flex h-[141px] w-[611px] items-center justify-center mt-2 mb-3 mx-auto mod-input">
          <button
            onClick={() => {
              ref.current?.click();
            }}
            className="bg-white border-solid border border-[#6CAA7D] p-2 px-4 rounded-[4px] text-[10px]"
          >
            Import Image from Device
          </button>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
            ref={ref}
            data-testid="file-input"
          />
        </div>
      </div>
    </EmbedModal>
  );
};

export default Picture;
