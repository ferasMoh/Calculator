import React from "react";
import "./App.scss";
import { squaresArray } from "./squaresArray";
import { IoBackspaceOutline } from "react-icons/io5";
import { TbMath } from "react-icons/tb";
import { CgMathPlus } from "react-icons/cg";
import { CgMathPercent } from "react-icons/cg";
import { CgMathMinus } from "react-icons/cg";

function App() {
  const [operation, setOperation] = React.useState(0);
  
  /* Show symbol based on item text */
  const showSymbol = (item) => {
    if (item === "erase") {
      return <IoBackspaceOutline size={23} />;
    } else {
      return item;
    }
  };

  return (
    <div className="app flexCenterColumn">
      <div className="result flexEnd">{operation}</div>
      <div className="squares flexCenter">
        {squaresArray.map((item, index) => {
          return (
            <div
              className={`square flexCenter ${item == "=" && "equal-bg"}`}
              key={index}
            >
              {showSymbol(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
