import { useState } from 'react';
import './Programs.css';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState<number>(0);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPrevVal(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevVal === null) {
      setPrevVal(inputValue);
    } else if (operator) {
      const currentVal = prevVal || 0;
      let result = currentVal;

      switch (operator) {
        case '+': result = currentVal + inputValue; break;
        case '-': result = currentVal - inputValue; break;
        case '*': result = currentVal * inputValue; break;
        case '/': result = inputValue !== 0 ? currentVal / inputValue : 0; break;
      }

      setPrevVal(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator === '=' ? null : nextOperator);
  };

  return (
    <div className="program-content calc-container">
      {/* Menu Bar */}
      <div className="program-toolbar">
        <span className="toolbar-item"><u>E</u>dit</span>
        <span className="toolbar-item"><u>V</u>iew</span>
        <span className="toolbar-item"><u>H</u>elp</span>
      </div>

      <div className="calc-body">
        {/* LCD Display */}
        <div className="calc-display-frame">
          <div className="calc-lcd-text">{display}</div>
        </div>

        {/* Memory & Function grid */}
        <div className="calc-grid">
          {/* Memory Row */}
          <button className="calc-btn memory-btn" onClick={() => setMemory(0)}>MC</button>
          <button className="calc-btn memory-btn" onClick={() => setDisplay(String(memory))}>MR</button>
          <button className="calc-btn memory-btn" onClick={() => setMemory(parseFloat(display))}>MS</button>
          <button className="calc-btn memory-btn" onClick={() => setMemory(memory + parseFloat(display))}>M+</button>

          {/* Row 1 */}
          <button className="calc-btn function-btn" onClick={clearEntry}>CE</button>
          <button className="calc-btn function-btn" onClick={clearAll}>C</button>
          <button className="calc-btn function-btn" onClick={() => setDisplay(String(-parseFloat(display)))}>+/-</button>
          <button className="calc-btn operator-btn" onClick={() => performOperation('/')}>/</button>

          {/* Row 2 */}
          <button className="calc-btn num-btn" onClick={() => inputDigit('7')}>7</button>
          <button className="calc-btn num-btn" onClick={() => inputDigit('8')}>8</button>
          <button className="calc-btn num-btn" onClick={() => inputDigit('9')}>9</button>
          <button className="calc-btn operator-btn" onClick={() => performOperation('*')}>*</button>

          {/* Row 3 */}
          <button className="calc-btn num-btn" onClick={() => inputDigit('4')}>4</button>
          <button className="calc-btn num-btn" onClick={() => inputDigit('5')}>5</button>
          <button className="calc-btn num-btn" onClick={() => inputDigit('6')}>6</button>
          <button className="calc-btn operator-btn" onClick={() => performOperation('-')}>-</button>

          {/* Row 4 */}
          <button className="calc-btn num-btn" onClick={() => inputDigit('1')}>1</button>
          <button className="calc-btn num-btn" onClick={() => inputDigit('2')}>2</button>
          <button className="calc-btn num-btn" onClick={() => inputDigit('3')}>3</button>
          <button className="calc-btn operator-btn" onClick={() => performOperation('+')}>+</button>

          {/* Row 5 */}
          <button className="calc-btn num-btn" onClick={() => inputDigit('0')}>0</button>
          <button className="calc-btn num-btn" onClick={inputDot}>.</button>
          <button className="calc-btn equals-btn" onClick={() => performOperation('=')}>=</button>
          <button className="calc-btn operator-btn" onClick={() => setDisplay(String(Math.sqrt(parseFloat(display))))}>&radic;</button>
        </div>
      </div>
    </div>
  );
}
