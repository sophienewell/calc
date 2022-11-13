import { useState } from "react";
import "./App.css";

function App() {
  const [enteredVal, setEnteredVal] = useState("");
  const [selectedFunc, setSelectedFunc] = useState(null);
  const [calcVal, setCalcVal] = useState("");
  const [solution, setSolution] = useState("");
  const [pow, setPow] = useState(false);

  const clear = () => {
    setEnteredVal("");
    setCalcVal("");
    setSolution("");
    setPow(false);
  };

  const addVal = (e) => {
    setEnteredVal(pow ? e.target.innerText : enteredVal + e.target.innerText);
    setCalcVal(calcVal + e.target.innerText);
    setSelectedFunc("");
  };

  const plusMinus = (e) => {
    let symbol;
    if (pow) {
      setPow(false);
      symbol = ")";
    } else {
      symbol = "";
    }
    if (e.target.innerText === "x") {
      symbol = symbol + "*";
    } else if (e.target.innerText === "(" && !selectedFunc) {
      symbol = symbol + "*(";
    } else {
      symbol = symbol + e.target.innerText;
    }

    setCalcVal(calcVal + symbol);
    setEnteredVal("");
    setSelectedFunc(symbol);
  };

  const exponent = () => {
    setPow(true);
    let lastVal = enteredVal.length;
    console.log(lastVal);
    setCalcVal(calcVal.slice(0, -lastVal) + "Math.pow(" + enteredVal + ", ");
  };

  const equals = () => {
    const calculate = (fn) => {
      return new Function("return " + fn)();
    };
    if (pow) {
      setPow(false);
      setSolution(calculate(calcVal + ")"));
    } else {
      setSolution(calculate(calcVal));
    }
  };

  return (
    <>
      <div className="container">
        <div className="display">{solution ? solution : enteredVal}</div>
        <div className="buttons">
          <button onClick={clear}>AC</button>
          <button onClick={plusMinus}>(</button>
          <button onClick={plusMinus}>)</button>
          <button onClick={exponent}>xy</button>
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
          <button>{pow ? "T" : "F"}</button>
        </div>
      </div>
      <p>{calcVal}</p>
    </>
  );
}

export default App;
