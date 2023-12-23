// Generics

// function addUID<T extends [number, string]>(arr: T) {
//   const uid = Math.floor(Math.random() * 100);
//   return { ...arr, uid };
// }

// const result = addUID([3, 'aaa']);
// console.log(addUID);

type arrayElement = [string, number | boolean];

const arr = [
  ['keyOne', 1],
  ['keyTwo', 12],
  ['keyThree', true],
];

function arrayToObject<arrayElement>(array: arrayElement[]) {
  return array.map((element) => ({ ...element }));
}

const result = arrayToObject(arr);
console.log(result);
