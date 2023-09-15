import React, { useState } from 'react';

export function HashList() {
  const [items, setItems] = useState([
    { id: crypto.randomUUID(), name: 'Item 1' },
    { id: crypto.randomUUID(), name: 'Item 2' },
  ]);

  function addItem() {
    setItems((currentItems) => {
      return [...currentItems, { id: crypto.randomUUID(), name: 'Item X' }];
    });
  }

  return (
    <>
      <button onClick={addItem}>Add Item</button>
      <pre>
        {items.map((item) => (
          <div key={item.id}>
            {item.name}: {item.id}
          </div>
        ))}
      </pre>
    </>
  );
}
