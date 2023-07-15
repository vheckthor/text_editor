import React, { useState, useContext } from "react";
import { EditorContext } from "../../context/EditorContext";
import { LinkAndVideoProps } from "../../types/interfaces";
import { IoShareSocial } from "react-icons/io5";
import EmbedModal from "../EmbedModal";

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
    const linkContent = `<a href="${url}" target="_blank">${code}</a>`;
    LinkorVideo(linkContent, "link");
    incrementWordCount();
    isClose();
  };

  return (
    <EmbedModal
      isOpen={isOpen}
      isClose={isClose}
      title="Embed"
      icon={<IoShareSocial />}
      onConfirm={handleSubmit}
      confirmButtonText="Embed"
    >
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

        {/* Rest of the form inputs */}
      </div>
    </EmbedModal>
  );
};

export default SocialMedia;
