import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EditorContext } from "../context/EditorContext";
import Accordion from "./Accordion";

interface ChildProps {
  onValue: (value: number) => void;
}

const QuillToolbar: React.FC<ChildProps> = ({ onValue }) => {
  const quillRef = useRef<ReactQuill>(null);
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (file) {
      handleFileChange(file);
    }
  }, [file]);

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
    onValue(words.length);
    return words.length;
  };

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const quill = quillRef.current?.getEditor();
      if (quill) {
        const length = quill.getLength();
        quill.insertEmbed(length, "image", dataUrl, "user");
      }
    };
    reader.readAsDataURL(file);
  };

  const LinkorVideo = (content: string, type: "link" | "video") => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const length = quill.getLength();
      if (type === "link") {
        quill.insertText(length, content, "link", content, "user");
        quill.setSelection(length, length + content.length);
      } else if (type === "video") {
        quill.insertEmbed(length, "video", content, "user");
        quill.setSelection(length, length + content.length);
      }
    }
  };

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
        <Accordion onFileChange={setFile} LinkorVideo={LinkorVideo} />
      </div>
    </EditorContext.Provider>
  );
};

export default QuillToolbar;
