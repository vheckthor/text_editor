import React from "react";
import { WordCountProps } from "../types/interfaces";


const WordCount: React.FC<WordCountProps> = ({ wordCount }) => {
  return (
    <div>
      <div className="counter">{wordCount}/1000 words</div>
    </div>
  );
};

export default WordCount;
