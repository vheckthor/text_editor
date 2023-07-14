import React, { useState, useContext } from "react";
import ReactModal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { EditorContext } from "../../context/EditorContext";
import { LinkAndVideoProps } from "../../types/interfaces";

const Video: React.FC<LinkAndVideoProps> = ({ LinkorVideo, isOpen, isClose }) => {
  const { incrementWordCount } = useContext(EditorContext);
  const [provider, setProvider] = useState("");
  const [url, setUrl] = useState("");

  const handleProviderInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProvider(e.target.value);
  };

const handleSubmit = () => {

  const regex = /\/watch\?v=([A-Za-z0-9_-]{11})/;
  const match = url.match(regex);
  let videoId =''
if(match){
  videoId = match[1];
  setUrl(`https://www.youtube.com/embed/${videoId}`);
}
setUrl(``);
  LinkorVideo(`https://www.youtube.com/embed/${videoId}`, "video");
  incrementWordCount();
  isClose();
  console.log(`https://www.youtube.com/embed/${videoId}`);
};

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={isClose}
      contentLabel="Modal"
      className="custom-modal bg-[#a1a1aa]"
    >
      <div className="bg-white rounded-md p-3 mod">
        <div className="flex items-center justify-between mb-4 px-2">
          <p className="font-bold px-1">Embed</p>
          <FaTimes className="cursor-pointer mr-2" onClick={isClose} />
        </div>
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
          <div className="flex flex-col h-[56px] mx-3 my-4 w-[611px] mod-input">
            <label
              htmlFor="URL"
              className="mb-2 social-media text-[10px] uppercase"
            >
              url
            </label>
            <input
              className="bg-[#FAFAFA] border border-gray-200 h-[34px] hover:border-[#E7F1E9] px-2 text-[12px] "
              onChange={(e) => setUrl(e.target.value)}
              name="code"
              placeholder=""
              id="url"
              data-testid="URL"
            />
          </div>
          <div className="mx-3 py-2 text-[14px]">
            <button
              className="bg-green-800 hover:bg-green-700 mr-2 text-white rounded-md"
              onClick={handleSubmit}
              data-testid="embed"
            >
              Embed
            </button>
            <button
              className="border-solid border border-[#CEE3D4] mr-2 rounded-md"
              onClick={isClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default Video;
