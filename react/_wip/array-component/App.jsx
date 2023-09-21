import { useState } from 'react';
import './style.css';

function App() {
  const [array, setArray] = useState(['A', 'B', 'C']);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="wrapper">
      <h1>{...array.join(',')}</h1>
      <button className="btn" onClick={removeFirstElement}>
        Remove first element
      </button>
      <button className="btn" onClick={removeB}>
        Remove B
      </button>
      <button className="btn" onClick={unshift1}>
        Unshift 1
      </button>
      <button className="btn" onClick={pushZ}>
        Push Z
      </button>
      <button className="btn" onClick={clearArray}>
        Clear
      </button>
      <button className="btn" onClick={resetArray}>
        Reset
      </button>
      <button className="btn" onClick={aToH}>
        A to H
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />{' '}
      <button className="btn" onClick={addValue}>
        Add to array
      </button>
      <button className="btn" onClick={addToIndex}>
        Add 🇺🇦 to index 3
      </button>
    </div>
  );

  function removeFirstElement() {
    setArray((currentArray) => currentArray.slice(1));
  }
  function removeB() {
    setArray((currentArray) => currentArray.filter((el) => el != 'B'));
  }
  function unshift1() {
    setArray((currentArray) => ['1', ...currentArray]);
  }
  function pushZ() {
    setArray((currentArray) => [...currentArray, 'Z']);
  }
  function clearArray() {
    setArray([]);
  }
  function resetArray() {
    setArray(['A', 'B', 'C']);
  }
  function aToH() {
    setArray((currentArray) =>
      currentArray.map((el) => (el === 'A' ? 'H' : el))
    );
  }
  function addValue() {
    setArray((currentArray) => [...currentArray, inputValue]);
  }
  function addToIndex() {
    setArray((currentArray) => [
      ...currentArray.slice(0, 3),
      '🇺🇦',
      ...currentArray.slice(3),
    ]);
  }
}

export default App;
