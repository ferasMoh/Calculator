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

  /* Calculate result by simple operation ( + - * / ) */
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

  /* Calculate percent */
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

  /* Calculate squared x² */
  const calcSquared = () => {
    const num = Number(fullNumber);
    if (result === 0) {
      setResult(num ** 2);
    } else {
      setResult((prev) => prev ** 2);
    }
    setShowResult(true);
  };

  /* Calculate Division by one */
  const calcdivisionByOne = () => {
    const num = Number(fullNumber);
    result === 0 ? setResult(1 / num) : setResult((prev) => 1 / prev);
    setShowResult(true);
  };

  /* Calculate Sqrt */
  const calcSqrt = () => {
    const num = Number(fullNumber);
    result === 0
      ? setResult(Math.sqrt(num))
      : setResult((prev) => Math.sqrt(prev));
    setShowResult(true);
  };

  /* Clear all data */
  const clearAll = () => {
    setFullNumber("0");
    setNumbers([0]);
    setOperator(null);
    setResult(0);
    setShowResult(false);
  };

  /* Handle click */
  const handleClick = (e) => {
    let key = e.key;
    if (key) {
      let keyCodeAsNumber = Number(key);
      let keyCodeAsString = String(key);

      if (key === "+" || key === "-" || key === "*" || key === "/") {
        key === "*" ? setOperator("x") : setOperator(key);
        setIsNumberTurn(false);
      } else if ((keyCodeAsNumber >= 0 && keyCodeAsNumber <= 9) || key == ".") {
        if (isNumberTurn) {
          setShowResult(false);
          if (
            (key == "." && !fullNumber.includes(".")) ||
            keyCodeAsString != "."
          ) {
            setFullNumber((prev) => prev + keyCodeAsString);
          }

          if (fullNumber[0] == "0") {
            setFullNumber(keyCodeAsString);
          }
        }
      } else if (key == "Enter" || key == "=") {
        calcResult();
      } else if (key == "Delete") {
        clearAll();
      } else if (key == "Backspace") {
        if (fullNumber !== "0") {
          setFullNumber(fullNumber.slice(0, fullNumber.length - 1));
        }
      }
    } else {
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
        clearAll();
      } else if (innerHTML.includes("path")) {
        if (fullNumber !== "0") {
          setFullNumber(fullNumber.slice(0, fullNumber.length - 1));
        }
      } else if (innerHTML == "%") {
        calcPercent();
      } else if (innerHTML == "1/x") {
        calcdivisionByOne();
      } else if (innerHTML == "x²") {
        calcSquared();
      } else if (innerHTML == "2√x") {
        calcSqrt();
      } else {
        /* add operatation then calculate automatically */
        setOperator(innerHTML);
        setIsNumberTurn(false);
      }
    }
  };

  /* Handle keyboard keys */
  React.useEffect(() => {
    document.addEventListener("keydown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleClick);
    };
  }, [fullNumber]);

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

  /* Show Result or full number by conditions */
  const showResultOrFullNumber = () => {
    let resultString = String(result);
    if (showResult) {
      if (resultString.length > 12) {
        return resultString.slice(0, 12) + "...";
      } else if (resultString === "Infinity") {
        resultString = "Cannot divide by zero";
        return resultString;
      } else {
        return resultString;
      }
    } else {
      return fullNumber;
    }
  };

  return (
    <div className="app flexCenterColumn">
      <div className="result">
        {operator && result != "Infinity" && (
          <div className="flexEnd">
            <p>{result ? result : numbers.slice(-1)}</p>
            <p>{operator}</p>
          </div>
        )}
        <div className="flexEndItemsEnd">
          {result == "Infinity" ? (
            <h4>{showResultOrFullNumber()}</h4>
          ) : (
            <h2>{showResultOrFullNumber()}</h2>
          )}
        </div>
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
