import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Popup from "./Accordion";
import { EditorContext } from "../context/EditorContext";

interface ChildProps {
  onValueFromChild: (value: number) => void;
}

const QuillToolbar: React.FC<ChildProps> = ({ onValueFromChild }) => {
  const quillRef = useRef<ReactQuill>(null);
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState("");

  const handleFileChange = (file: File) => {
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      console.log(file);
      const dataUrl = reader.result as string;
      const quill = quillRef.current?.getEditor();
      if (quill) {
        const range = quill.getSelection();
        quill.insertEmbed(range?.index || 0, "image", dataUrl, "user");
      }
    };
    reader.readAsDataURL(file);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const getWordCount = () => {
    const text = value.replace(/(<([^>]+)>)/gi, "");
    const words = text.trim().split(/\s+/);
    onValueFromChild(words.length);
    return words.length;
  };

  console.log(file);

  return (
    <EditorContext.Provider
      value={{ incrementWordCount: () => {}, wordCount: 0 }}
    >
      <div className="grow relative">
        <p className="article-title my-4">This is the title</p>
        <ReactQuill
          preserveWhitespace={true}
          style={{
            borderBottom: "none",
            minHeight: "30vh",
            maxHeight: "50vh",
            overflowY: "scroll",
            width: "700px",
          }}
          theme="snow"
          modules={modules}
          value={value}
          ref={quillRef}
          onChange={setValue}
        />
        <p className="hidden">{getWordCount()}</p>
        <Popup onFileChange={handleFileChange} />
      </div>
    </EditorContext.Provider>
  );
};

export default QuillToolbar;
