import React, { useState, useContext } from "react";
import {FaVideo } from "react-icons/fa";
import { EditorContext } from "../../context/EditorContext";
import { LinkAndVideoProps } from "../../types/interfaces";
import EmbedModal from "../EmbedModal";

const Video: React.FC<LinkAndVideoProps> = ({
  LinkorVideo,
  isOpen,
  isClose,
}) => {
  const { incrementWordCount } = useContext(EditorContext);
  const [provider, setProvider] = useState("");
  const [url, setUrl] = useState("");

  const handleProviderInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProvider(e.target.value);
  };

  const handleSubmit = () => {
    const regex = /\/watch\?v=([A-Za-z0-9_-]{11})/;
    const match = url.match(regex);
    let videoId = "";
    if (match) {
      videoId = match[1];
      setUrl(`https://www.youtube.com/embed/${videoId}`);
    }
    setUrl(``);
    LinkorVideo(`https://www.youtube.com/embed/${videoId}`, "video");
    incrementWordCount();
    isClose();
  };

  return (
    <EmbedModal
      isOpen={isOpen}
      isClose={isClose}
      title="Embed"
      icon={<FaVideo />}
      onConfirm={handleSubmit}
      confirmButtonText="Embed"
    >
      <div className="px-3">
        <div className="flex flex-col h-[56px] mx-3 my-4 w-[611px] mod-input">
          <label
            htmlFor="provider-select"
            className="mb-2 social-media text-[10px] uppercase"
          >
            Video provider
          </label>
          <select
            onChange={handleProviderInput}
            className="bg-[#FAFAFA] border border-gray-200 h-[34px] outline-gray-300 px-2 text-[12px]"
            name="social-media"
            data-testid="provider-select"
            id=""
          >
            <option>Youtube</option>
          </select>
        </div>
        {/* Rest of the form inputs */}
      </div>
    </EmbedModal>
  );
};

export default Video;
