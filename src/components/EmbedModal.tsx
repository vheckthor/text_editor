import React from "react";
import { FaTimes } from "react-icons/fa";
import ReactModal from "react-modal";

interface EmbedModalProps {
  isOpen: boolean;
  isClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm: () => void;
  confirmButtonText: string;
}

const EmbedModal: React.FC<EmbedModalProps> = ({
  isOpen,
  isClose,
  title,
  onConfirm,
  confirmButtonText,
  children,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={isClose}
      contentLabel="Modal"
      className="custom-modal bg-[#a1a1aa]"
    >
      <div className="bg-white rounded-md p-3 mod">
        <div className="flex items-center justify-between mb-4 px-2">
          <p className="font-bold px-1">{title}</p>
          <FaTimes className="cursor-pointer mr-2" onClick={isClose} />
        </div>
        {children}
        <div className="py-2 text-[14px]">
          <button
            className="bg-green-800 hover:bg-green-700 mr-2 text-white rounded-md"
            onClick={onConfirm}
            data-testid="embed"
          >
            {confirmButtonText}
          </button>
          <button
            className="border-solid border border-[#CEE3D4] mr-2 rounded-md"
            onClick={isClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default EmbedModal;
