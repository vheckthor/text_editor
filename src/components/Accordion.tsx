import React, { useState, useContext } from "react";
import { AiFillPicture } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import Picture from "./Picture";
import Video from "./Video";
import SocialMedia from "./SocialMedia";
import { EditorContext } from "../context/EditorContext";


interface AccordionProps {
  onFileChange: (file: File) => void;
  LinkorVideo: (content: string, type: "link" | "video") => void;
}

const Accordion: React.FC<AccordionProps> = ({ onFileChange, LinkorVideo }) => {
  const { incrementWordCount } = useContext(EditorContext);
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickBtn, setClickBtn] = useState(false);

  const handleFileChange = (file: File) => {
    onFileChange(file);
    incrementWordCount();
  };

  const openModal = (text: string) => {
    if (text === "pictures") {
      setText("pictures");
    } else if (text === "videos") {
      setText("videos");
    } else if (text === "links") {
      setText("links");
    }
    setIsModalOpen(true);
    setClickBtn(!clickBtn);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickBtn = () => {
    setClickBtn(!clickBtn);
  };

  return (
    <div className="absolute flex flex-col h-[32vh] justify-start my-[10px] px-2">
      <div
        onClick={handleClickBtn}
        aria-labelledby="Add Link"
        className="bg-[#E7F1E9] cursor-pointer flex items-center justify-center w-[30px] mb-1 ml-2 p-2 px-5 rounded-full"
      >
        +
      </div>

      {clickBtn && (
        <div className="bg-white w-[300px]">
          <p
            className="text-[14px] font-thin uppercase"
            style={{ marginBottom: "2px", padding: "3px 15px" }}
          >
            Embeds
          </p>
          <div className="btn" onClick={() => openModal("pictures")}>
            <AiFillPicture className="icons" />
            <div className="popup-category">
              <span className="popup-category-title text-[12px]">Picture</span>
              <span className="popup-category-sm text-[8px]">jpeg, png</span>
            </div>
          </div>
          <p className="btn" onClick={() => openModal("videos")}>
            <FaVideo className="icons" />
            <span className="popup-category">
              <span className="popup-category-title text-[12px]">Video</span>
              <span className="popup-category-sm text-[8px]">
                Embed a Youtube Video
              </span>
            </span>
          </p>
          <p className="btn" onClick={() => openModal("links")}>
            <IoShareSocial className="icons" />
            <span className="popup-category">
              <span className="popup-category-title text-[12px]">Social</span>
              <span className="popup-category-sm text-[8px]">
                Embed a Facebook link
              </span>
            </span>
          </p>
        </div>
      )}
      {text === "pictures" && (
        <Picture
          isOpen={isModalOpen}
          isClose={closeModal}
          onFileChange={handleFileChange}
        />
      )}
      {text === "videos" && (
        <Video
          isOpen={isModalOpen}
          LinkorVideo={LinkorVideo}
          isClose={closeModal}
        />
      )}
      {text === "links" && (
        <SocialMedia
          isOpen={isModalOpen}
          LinkorVideo={LinkorVideo}
          isClose={closeModal}
        />
      )}
    </div>
  );
};

export default Accordion;
