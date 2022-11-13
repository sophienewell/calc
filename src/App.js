import { useState } from "react";
import "./App.css";

function App() {
  const [enteredVal, setEnteredVal] = useState("");
  const [selectedFunc, setSelectedFunc] = useState(null);
  const [calcVal, setCalcVal] = useState("");
  const [solution, setSolution] = useState("");

  const clear = () => {
    setEnteredVal("");
    setCalcVal("");
    setSolution("");
  };

  const addVal = (e) => {
    setEnteredVal(enteredVal + e.target.innerText);
    setCalcVal(calcVal + e.target.innerText);
  };

  const plusMinus = (e) => {
    let symbol;
    if (e.target.innerText === "x") {
      symbol = "*";
    } else {
      symbol = e.target.innerText;
    }
    setCalcVal(calcVal + symbol);
    setEnteredVal("");
    setSelectedFunc(symbol);
  };

  const equals = () => {
    const calculate = (fn) => {
      return new Function("return " + fn)();
    };
    setSolution(calculate(calcVal));
  };

  return (
    <>
      <div className="container">
        <div className="display">{solution ? solution : enteredVal}</div>
        <div className="buttons">
          <button onClick={clear}>AC</button>
          <button>(</button>
          <button>)</button>
          <button>xy</button>
          <button onClick={addVal}>7</button>
          <button onClick={addVal}>8</button>
          <button onClick={addVal}>9</button>
          <button onClick={plusMinus}>/</button>
          <button onClick={addVal}>4</button>
          <button onClick={addVal}>5</button>
          <button onClick={addVal}>6</button>
          <button onClick={plusMinus}>x</button>
          <button onClick={addVal}>1</button>
          <button onClick={addVal}>2</button>
          <button onClick={addVal}>3</button>
          <button onClick={plusMinus}>-</button>
          <button onClick={addVal}>0</button>
          <button onClick={addVal}>.</button>
          <button onClick={plusMinus}>+</button>
          <button onClick={equals}>=</button>
        </div>
      </div>
      <p>{calcVal}</p>
    </>
  );
}

export default App;
