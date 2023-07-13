import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EditorContext } from "../context/EditorContext";
import Accordion from "./Accordion";

interface ChildProps {
  onValue: (value: number) => void;

}

const QuillToolbar: React.FC<ChildProps> = ({
  onValue,
  
}) => {
  const quillRef = useRef<ReactQuill>(null);
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState("");

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
  setFile(file);
  const reader = new FileReader();
  reader.onload = () => {
    console.log(file);
    const dataUrl = reader.result as string;
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const range = quill.getSelection();
      if (range) {
        
        quill.insertEmbed(range.length + 1, "image", dataUrl, "user");
      }
      else{

        quill.insertEmbed(0, "image", dataUrl, "user");
      }
    }
  };
  reader.readAsDataURL(file);
};

const LinkorVideo = (
  content: string,
  type: "link" | "video"
) => {
  const quill = quillRef.current?.getEditor();
  if (quill) {
    const range = quill.getSelection();
    if (range) {
      const index = range.index;
      if (type === "link") {
        quill.insertText(index, content, "link", content, "user");
        quill.setSelection(index, index + content.length);
      } else if (type === "video") {
        quill.insertEmbed(index, "video", content, "user");
        
        quill.setSelection(index, index + 1);
      }
    } else {
      if (type === "link") {
        quill.insertText(0, content, "link", content, "user");
        quill.setSelection(0, content.length);
      } else if (type === "video") {
        quill.insertEmbed(0, "video", content, "api");
        quill.setSelection(0, content.length);
      }
    }
  }
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
        <Accordion onFileChange={handleFileChange} LinkorVideo={LinkorVideo} />
      </div>
    </EditorContext.Provider>
  );
};

export default QuillToolbar;
