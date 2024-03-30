import "./App.scss";
import React from "react";
import { squaresArray } from "./squaresArray";
import { IoBackspaceOutline } from "react-icons/io5";

function App() {
  const [operator, setOperator] = React.useState(null);
  const [isNumberTurn, setIsNumberTurn] = React.useState(true);
  const [startCalculate, setStartCalculate] = React.useState(false);
  const [numbers, setNumbers] = React.useState([0]);
  const [fullNumber, setFullNumber] = React.useState("0");
  const [result, setResult] = React.useState(0);

  /* Show symbol based on item text */
  const showSymbol = (item) => {
    if (item === "erase") {
      return <IoBackspaceOutline size={23} />;
    } else {
      return item;
    }
  };

  /* Handle click */
  const handleClick = (e) => {
    const innerHTML = e.target.innerHTML;
    if ((innerHTML >= 0 && innerHTML <= 9) || innerHTML == ".") {
      if (isNumberTurn) {
        setFullNumber((prev) => prev + innerHTML);
        if (fullNumber[0] == "0") {
          setFullNumber(innerHTML);
        }
      }
    } else if (innerHTML == "+/-") {
      /* Change number to negative or positive */
      setFullNumber(-fullNumber);
    } else {
      /* add operatation then calculate automatically */
      setOperator(innerHTML);
      setIsNumberTurn(false);
      setStartCalculate(true);
    }
  };

  /* Start Calculate based on Operator */
  React.useEffect(() => {
    if (startCalculate) {
      const num = Number(fullNumber);
      switch (operator) {
        case "+":
          result === 0 ? setResult(num) : setResult((prev) => prev + num);
          break;
        case "-":
          result === 0 ? setResult(num) : setResult((prev) => prev - num);
          break;
        case "x":
          result === 0 ? setResult(num) : setResult((prev) => prev * num);
          break;
        case "/":
          result === 0 ? setResult(num) : setResult((prev) => prev / num);
          break;

        default:
          null;
      }
      setStartCalculate(false);
    }
  }, [startCalculate]);

  /* when number turn end add full number to array then back to number turn */
  React.useEffect(() => {
    if (!isNumberTurn) {
      setNumbers((prev) => [...prev, Number(fullNumber)]);
      setIsNumberTurn(true);
      setFullNumber("0");
    }
  }, [isNumberTurn]);

  return (
    <div className="app flexCenterColumn">
      <div className="result flexEndColumn">
        {result && (
          <div className="flexCenter">
            <p>{result}</p>
            <p>{operator}</p>
          </div>
        )}
        <h2>{fullNumber}</h2>
      </div>
      <div className="squares flexCenter">
        {squaresArray.map((item, index) => {
          return (
            <div
              className={`square flexCenter ${item == "=" && "equal-bg"}`}
              key={index}
              onClick={handleClick}
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
