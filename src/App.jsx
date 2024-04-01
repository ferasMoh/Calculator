import "./App.scss";
import React from "react";
import { squaresArray } from "./squaresArray";
import { IoBackspaceOutline } from "react-icons/io5";

function App() {
  const [operator, setOperator] = React.useState(null);
  const [isNumberTurn, setIsNumberTurn] = React.useState(true);
  const [numbers, setNumbers] = React.useState([0]);
  const [fullNumber, setFullNumber] = React.useState("0");
  const [showResult, setShowResult] = React.useState(false);
  const [result, setResult] = React.useState(0);

  /* Show symbol based on item text */
  const showSymbol = (item) => {
    if (item === "erase") {
      return <IoBackspaceOutline size={23} />;
    } else {
      return item;
    }
  };

  /* Calculate result function */
  const calcResult = () => {
    const num = Number(fullNumber);
    switch (operator) {
      case "+":
        result === 0
          ? setResult(Number(numbers.slice(-1)) + num)
          : setResult((prev) => prev + num);
        break;
      case "-":
        result === 0
          ? setResult(Number(numbers.slice(-1)) - num)
          : setResult((prev) => prev - num);
        break;
      case "x":
        result === 0
          ? setResult(Number(numbers.slice(-1)) * num)
          : setResult((prev) => prev * num);
        break;
      case "/":
        result === 0
          ? setResult(Number(numbers.slice(-1)) / num)
          : setResult((prev) => prev / num);
        break;

      default:
        null;
    }

    setShowResult(true);
    setFullNumber("0");
  };

  /* Calculate percent function */
  const calcPercent = () => {
    const num = Number(fullNumber);
    const lastValue = Number(numbers.slice(-1));
    if (result === 0) {
      setResult((lastValue * num) / 100);
    } else {
      setResult((prev) => (prev * num) / 100);
    }
    setShowResult(true);
    setFullNumber("0");
  };

  /* Handle click */
  const handleClick = (e) => {
    const innerHTML = e.target.innerHTML;
    if ((innerHTML >= 0 && innerHTML <= 9) || innerHTML == ".") {
      if (isNumberTurn) {
        setShowResult(false);
        if (
          (innerHTML == "." && !fullNumber.includes(".")) ||
          innerHTML !== "."
        ) {
          setFullNumber((prev) => prev + innerHTML);
        }
        if (fullNumber[0] == "0") {
          setFullNumber(innerHTML);
        }
      }
    } else if (innerHTML == "+/-") {
      /* Change number to negative or positive */
      setFullNumber(-fullNumber);
    } else if (innerHTML == "=") {
      /* Calculate Result */
      calcResult();
    } else if (innerHTML == "C" || innerHTML == "CE") {
      /* Clear All */
      setFullNumber("0");
      setNumbers([0]);
      setOperator(null);
      setResult(0);
      setShowResult(false);
    } else if (innerHTML.includes("path")) {
      if (fullNumber !== "0") {
        setFullNumber(fullNumber.slice(0, fullNumber.length - 1));
      }
    } else if (innerHTML == "%") {
      calcPercent();
    } else {
      /* add operatation then calculate automatically */
      setOperator(innerHTML);
      setIsNumberTurn(false);
    }
  };

  /* zero fullNumber when his length arrive to 0 */
  React.useEffect(() => {
    if (fullNumber.length == 0) {
      setFullNumber("0");
    }
  }, [fullNumber.length]);

  /* when number turn end add full number to array then back to number turn */
  React.useEffect(() => {
    if (!isNumberTurn) {
      setNumbers((prev) => [...prev, Number(fullNumber)]);
      setFullNumber("0");
      setIsNumberTurn(true);
    }
  }, [isNumberTurn]);

  console.log(numbers, fullNumber, result);

  return (
    <div className="app flexCenterColumn">
      <div className="result flexEndColumn">
        {operator && (
          <div className="flexCenter">
            <p>{result ? result : numbers.slice(-1)}</p>
            <p>{operator}</p>
          </div>
        )}
        <h2>{showResult ? result : fullNumber}</h2>
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
