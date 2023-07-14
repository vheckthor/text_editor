import React, { useState, useContext } from "react";
import ReactModal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { EditorContext } from "../../context/EditorContext";
import { LinkAndVideoProps } from "../../types/interfaces";



const SocialMedia: React.FC<LinkAndVideoProps> = ({
  isOpen,
  isClose,
  LinkorVideo,
}) => {
  const { incrementWordCount } = useContext(EditorContext);
  const socials = ["Facebook", "Twitter", "Instagram", "TikTok"];
  const [toggleCaption, setToggleCaption] = useState(false);
  const [provider, setProvider] = useState("");
  const [code, setCode] = useState("");
  const [url, setUrl] = useState("");

  const handleProviderInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProvider(e.target.value);
  };

  const handleSubmit = () => {
    console.log(provider);
    console.log(code);
    console.log(url);
    const linkContent = `<a href="${url}" target="_blank">${code}</a>`;
    LinkorVideo(linkContent, "link");
    incrementWordCount()
    isClose();
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
          <div className="flex flex-col h-[56px] my-4 w-[611px] mod-input">
            <label
              className="mb-2 social-media text-[10px] uppercase"
              htmlFor="Social Media Platform"
            >
              Social Media Platform
            </label>
            <select
              onChange={handleProviderInput}
              className="bg-[#FAFAFA] border border-gray-200 h-[34px] outline-gray-300 px-2 text-[12px]"
              name="social-media"
              id="Social Media Platform"
            >
              {socials.map((obj, idx) => (
                <option key={idx} value={obj}>
                  {obj}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col h-[56px] my-4 w-[611px] mod-input">
            <label
              className="mb-2 social-media text-[10px] uppercase"
              htmlFor="url"
            >
              url
            </label>
            <input
              onChange={(e) => setUrl(e.target.value)}
              className="bg-[#FAFAFA] border border-gray-200 h-[34px] outline-gray-300 px-2 text-[12px]"
              name="url"
              placeholder=""
              id="url"
            />
          </div>

          <div className="flex flex-col h-[56px] my-4 w-[611px] mod-input">
            <label
              htmlFor="Code"
              className="mb-2 social-media text-[10px] uppercase"
            >
              Code
            </label>
            <input
              onChange={(e) => setCode(e.target.value)}
              className="bg-[#FAFAFA] border border-gray-200 h-[34px] outline-gray-300 px-2 text-[12px]"
              name="code"
              placeholder=""
              id="Code"
            />
          </div>

          <div className="mb-2 flex items-center justify-between">
            <p className="text-[12px]">Disable caption</p>
            <div
              className={
                toggleCaption ? "toggle-container" : "toggle-container on"
              }
              onClick={() => setToggleCaption(!toggleCaption)}
            >
              <div className="toggle-handle"></div>
            </div>
          </div>

          <div className="py-2 text-[14px]">
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

export default SocialMedia;
