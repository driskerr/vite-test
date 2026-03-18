import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import * as d3 from "d3";

function App() {
  const [count, setCount] = useState(0);
  const data = [4, 8, 15, 16, 23, 42];

  return (
    <>
      <h1>Hello World!</h1>
      <p>How are you doing?!</p>
      <p>{d3.max(data)}</p>
    </>
  );
}

export default App;
