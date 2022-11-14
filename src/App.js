import { useState } from "react";
import "./App.css";

function App() {
  const [enteredVal, setEnteredVal] = useState(0);
  const [selectedFunc, setSelectedFunc] = useState(null);
  const [calcVal, setCalcVal] = useState("");
  const [solution, setSolution] = useState("");
  const [pow, setPow] = useState(false);
  const [err, setErr] = useState(false);

  const clear = () => {
    setEnteredVal(0);
    setCalcVal("");
    setSolution("");
    setPow(false);
    setErr(false);
  };

  const addVal = (e) => {
    setEnteredVal(
      //0 will not be shown at the beginning of any number
      enteredVal === 0 && e.target.innerText !== "."
        ? e.target.innerText
        : enteredVal + e.target.innerText
    );
    setCalcVal(calcVal + e.target.innerText);
    enteredVal.length > 11 ? setErr(true) : setErr(false);
  };

  const arith = (e) => {
    let symbol;
    if (pow && e.target.innerText !== "(" && selectedFunc !== "(") {
      setPow(false);
      symbol = ")";
    } else {
      symbol = "";
    }

    if (e.target.innerText === "x") {
      symbol = symbol + "*";
    }
    //allows multiplication using brackets (no *)
    else if (e.target.innerText === "(" && !selectedFunc && calcVal && !pow) {
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
      calcVal.toString().slice(0, -lastValLength) + `Math.pow(${enteredVal},`
    );
    setTimeout(setEnteredVal(""), 100);
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
    newVal.toString().length > 11 ? setErr(true) : setErr(false);
  };

  return (
    <div className="outer-container">
      <div className="container">
        <div className="display">
          {solution
            ? solution.toString().slice(0, 12)
            : enteredVal.toString().slice(0, 12)}
        </div>
        <div className="buttons">
          <button className="function" onClick={clear}>
            AC
          </button>
          <button className="function" onClick={arith}>
            (
          </button>
          <button className="function" onClick={closeParenth}>
            )
          </button>
          <button className="function" onClick={exponent}>
            X<span className="textsmall">y</span>
          </button>
          <button onClick={addVal}>7</button>
          <button onClick={addVal}>8</button>
          <button onClick={addVal}>9</button>
          <button className="function" onClick={arith}>
            /
          </button>
          <button onClick={addVal}>4</button>
          <button onClick={addVal}>5</button>
          <button onClick={addVal}>6</button>
          <button className="function" onClick={arith}>
            x
          </button>
          <button onClick={addVal}>1</button>
          <button onClick={addVal}>2</button>
          <button onClick={addVal}>3</button>
          <button className="function" onClick={arith}>
            -
          </button>
          <button onClick={addVal}>0</button>
          <button onClick={addVal}>.</button>
          <button className="function" onClick={arith}>
            +
          </button>
          <button className="function" onClick={equals}>
            =
          </button>
        </div>
      </div>
      {err && (
        <div className="err">
          <p>Display will show a maximum of 12 digits</p>
        </div>
      )}
    </div>
  );
}

export default App;
