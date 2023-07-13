import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import QuillToolbar from "../components/QuillToolbar";


interface ChildProps {
  onValue: (value: number) => void;
}
export const Helper: React.FC<ChildProps> = ({ onValue }) => {
  const quillRef = useRef<ReactQuill>(null);
  const [file, setFile] = useState<File | null>(null);
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
  return (
    <div>
      <QuillToolbar onValue={onValue} handleFileChange={handleFileChange} />
    </div>
  );
};

export default Helper
