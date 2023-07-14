export interface ChildProps {
  onValue: (value: number) => void;
}
export interface AccordionProps {
  onFileChange: (file: File) => void;
  LinkorVideo: (content: string, type: "link" | "video") => void;
}
export interface PictureProps {
  onFileChange: (file: File) => void;
  isOpen: boolean;
  isClose: () => void;
}
export interface LinkAndVideoProps{
  isOpen: boolean;
  isClose: () => void;
  LinkorVideo: (content: string, type: "link" | "video") => void;
}
export interface WordCountProps {
  wordCount: number;
}