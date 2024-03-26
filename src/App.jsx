import React from "react";
import "./App.css";

function App() {
  const [squares, setSquares] = React.useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = React.useState(true);

  /* Add Item */
  const addItem = (index) => {
    if (squares[index]) {
      return;
    }
    const newSquares = squares;
    newSquares[index] = isXNext ? "X" : "O";
    setSquares([...newSquares]);
    setIsXNext(!isXNext);
  };

  /* Calculate Winner */
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  /* Store winner in variable */
  const winner = calculateWinner(squares);

  /* reset game */
  const reset = () => {
    setSquares(Array(9).fill(""));
    setIsXNext(true);
  };

  return (
    <>
      <div className={`dialog ${winner && "dialog-display"}`}>
        Winner is : {winner}
      </div>
      <label>X and O Game</label>
      <div className="all-squares">
        {squares.map((square, index) => {
          return (
            <div className="square" onClick={() => addItem(index)} key={index}>
              {square}
            </div>
          );
        })}
      </div>
      {!winner && (
        <div>
          <h1>Next Player is : {isXNext ? "X" : "O"}</h1>
        </div>
      )}
      <button onClick={reset} className="reset">
        Reset
      </button>
    </>
  );
}

export default App;
