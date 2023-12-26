type arrayElement = [string, number | boolean];

const arr: arrayElement[] = [
  ['keyOne', 1],
  ['keyTwo', 12],
  ['keyThree', true],
];

function arrayToObject<T extends arrayElement>(array: T[]) {
  return array.map((el) => ({ [el[0]]: el[1] }));
}

const result = arrayToObject(arr);
console.log(JSON.stringify(result));
