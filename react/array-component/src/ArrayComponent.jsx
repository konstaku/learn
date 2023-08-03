import { useState } from 'react';
import { RemoveCustomIndex } from './RemoveCustomIndex';

export function ArrayComponent() {
  const [array, setArray] = useState(setupArray);
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <h1>[{array.join(', ')}]</h1>
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
      <input
        value={inputValue}
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => addInputValueToTheBeginningOfAnArray(e)}
      />
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

  function removeFirstElement() {
    setArray((currentArray) => {
      return currentArray.slice(1);
    });
  }

  function removeCustomElement(e) {
    const removeIndex = +e.target.dataset.index;

    if (removeIndex) {
      setArray((currentArray) => {
        const result = [...currentArray];
        result.splice(removeIndex, 1);
        return result;
      });
    } else {
      removeFirstElement();
    }
  }

  function addNewElementToBeginning() {
    const value = prompt('Enter a new value', 0);

    if (value) {
      setArray((currentArray) => {
        return [value, ...currentArray];
      });
    }
  }

  function addNewElementToEnd() {
    const value = prompt('Enter a new value', 0);

    if (value) {
      setArray((currentArray) => {
        return [...currentArray, value];
      });
    }
  }

  function clearArray() {
    setArray(() => []);
  }

  function resetToInitial() {
    setArray(setupArray);
  }

  function updateAllAtoH() {
    setArray((currentArray) => {
      return currentArray.map((element) => (element === 'A' ? 'H' : element));
    });
  }

  function addInputValueToTheBeginningOfAnArray(e) {
    if (e.code === 'Enter') {
      setArray((currentArray) => {
        return [e.target.value, ...currentArray];
      });
    }
  }

  function addElementToCustomIndex() {
    const index = prompt('Select an index to add new element', 0);

    if (typeof +index !== 'number') {
      alert("That's not a number!");
      return;
    }

    const value = prompt('Select a value to add', 'Scooter');

    if (value) {
      setArray((currentArray) => {
        return [
          ...currentArray.slice(0, index),
          value,
          ...currentArray.slice(index),
        ];

        const result = [...currentArray];
        result[index] = value;
        return result;
      });
    }
  }
}
