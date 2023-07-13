import { useState } from "react";
import WordCount from "./components/WordCount";

import TitleBar from "./components/TitleBar";
import Submit from "./components/Submit";
import Helper from "./Utils/helper";

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
          <Helper onValue={handleValue} />

        </div>

      </div>
    </>
  );
}

export default App;
