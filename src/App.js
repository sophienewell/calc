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
    //setSelectedFunc("");
  };

  const plusMinus = (e) => {
    let symbol;
    if (pow && e.target.innerText !== "(" && selectedFunc !== "(") {
      setPow(false);
      symbol = ")";
    } else {
      symbol = "";
    }

    if (e.target.innerText === "x") {
      symbol = symbol + "*";
    } else if (e.target.innerText === "(" && !selectedFunc && calcVal && !pow) {
      symbol = symbol + "*(";
    } else {
      symbol = symbol + e.target.innerText;
    }

    setCalcVal(calcVal + symbol);
    setEnteredVal("");
    setSelectedFunc(symbol);
  };

  const closeParenth = () => {
    if (pow) {
      setCalcVal(calcVal + ")");
    } else {
      let parenthLength = calcVal.lastIndexOf("(");
      let preParenthContent = calcVal.slice(0, parenthLength);
      let parenthVal = eval(calcVal.slice(parenthLength, calcVal.length) + ")");
      setCalcVal(preParenthContent + parenthVal);
      setEnteredVal(parenthVal);
    }
  };

  const exponent = () => {
    setPow(true);
    let lastValLength = enteredVal.length;
    setCalcVal(
      calcVal.toString().slice(0, -lastValLength) +
        "Math.pow(" +
        enteredVal +
        ", "
    );
  };

  const equals = () => {
    const calculate = (fn) => {
      return new Function("return " + fn)();
    };
    let newVal;
    if (pow) {
      setPow(false);
      newVal = calculate(calcVal + ")");
    } else {
      newVal = calculate(calcVal);
    }
    setSolution(newVal);
    setCalcVal(newVal);
    setEnteredVal(newVal);
  };

  return (
    <>
      <div className="container">
        <div className="display">{solution ? solution : enteredVal}</div>
        <div className="buttons">
          <button onClick={clear}>AC</button>
          <button onClick={plusMinus}>(</button>
          <button onClick={closeParenth}>)</button>
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
        </div>
      </div>
    </>
  );
}

export default App;
