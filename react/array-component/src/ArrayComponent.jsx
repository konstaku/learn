import { useState } from 'react';
import { RemoveCustomIndex } from './RemoveCustomIndex';

export function ArrayComponent() {
  const [array, setArray] = useState(setupArray);

  return (
    <div>
      <h1>[{displayArray()}]</h1>
      <input
        type="button"
        value="Remove first element"
        onClick={removeFirstElement}
      />
      <br />
      <br />
      <div onClick={removeCustomElement}>
        <RemoveCustomIndex array={array} />
      </div>
      <br />
      <input
        type="button"
        value="Add new element to the beginning"
        onClick={addNewElementToBeginning}
      />
      <br />
      <br />
      <input
        type="button"
        value="Add new element to the end"
        onClick={addNewElementToEnd}
      />
      <br />
      <br />
      <input type="button" value="Clear array" onClick={clearArray} />
      <br />
      <br />
      <input
        type="button"
        value="Reset to initial value"
        onClick={resetToInitial}
      />
      <br />
      <br />
      <input
        type="button"
        value="Update all 'A' to 'H'"
        onClick={updateAllAtoH}
      />
      <br />
      <br />
      <input type="text" onKeyDown={addInputValueToTheBeginningOfAnArray} />
      <br />
      <br />
      <input
        type="button"
        value="Add a new element to custom index"
        onClick={addElementToCustomIndex}
      />
    </div>
  );

  function setupArray() {
    return ['A', 'B', 'C'];
  }

  function displayArray() {
    let string = '';
    array.forEach((el) => (string += el + ', '));
    return string.slice(0, string.length - 2);
  }

  function removeFirstElement() {
    array.shift();
    setArray([...array]);
  }

  function removeCustomElement(e) {
    const removeIndex = +e.target.dataset.index;

    if (removeIndex) {
      console.log('remove index:', removeIndex);
      array.splice(removeIndex, 1);
      setArray([...array]);
    } else {
      removeFirstElement();
    }
  }

  function addNewElementToBeginning() {
    const value = prompt('Enter a new value', 0);

    if (value) {
      array.unshift(value);
      setArray([...array]);
    }
  }

  function addNewElementToEnd() {
    const value = prompt('Enter a new value', 0);

    if (value) {
      array.push(value);
      setArray([...array]);
    }
  }

  function clearArray() {
    setArray([]);
  }

  function resetToInitial() {
    const resetArray = setupArray();
    setArray(resetArray);
  }

  function updateAllAtoH() {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === 'A') {
        array[i] = 'H';
      }
    }

    setArray([...array]);
  }

  function addInputValueToTheBeginningOfAnArray(e) {
    if (e.code === 'Enter') {
      array.unshift(e.target.value);
      setArray([...array]);
    }
  }

  function addElementToCustomIndex() {
    const index = prompt('Select an index to add new element', 0);
    const value = prompt('Select a value to add', 'Scooter');

    if (value) {
      array[index] = value;
      setArray([...array]);
    }
  }
}
