import { createContext } from "react";

interface EditorContextProps {
  wordCount: number;
  incrementWordCount: () => void;
}

export const EditorContext = createContext<EditorContextProps>({
  wordCount: 0,
  incrementWordCount: () => {},
});
