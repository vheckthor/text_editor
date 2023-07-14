import { useState } from "react";
import WordCount from "./components/WordCount";

import TitleBar from "./components/TitleBar";
import Submit from "./components/Submit";
import QuillToolbar from "./components/Editor";


function App() {
  const [value, setValue] = useState(0);
  const handleValue = (value: number) => {
    setValue(value);
  };

  return (
    <>
      <div>
        <div className="mx-auto wrapper">
          <TitleBar />
          <QuillToolbar onValue={handleValue} />
          <WordCount wordCount={value} />
        </div>
        <Submit />
      </div>
    </>
  );
}

export default App;
