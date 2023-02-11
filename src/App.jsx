import { useState } from "react";
import "./App.css";
import Questions from "./Questions";
import Start from "./Start";

function App() {
  const [start, setStart] = useState(false);

  function handleStart() {
    setStart(true);
    console.log("clicked")
  }

  return (
    <div>
      {start ? <Questions /> : <Start click={handleStart} /> }
    </div>
  );
}

export default App;

