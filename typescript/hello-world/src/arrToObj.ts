// type arrayElement = [string, number | boolean];
type ObjectElement = { [index: string]: number | boolean };

const arr = new Array<[string, number | boolean]>(
  ['keyOne', 1],
  ['keyTwo', 12],
  ['keyThree', true]
);

function arrayToObject<T extends typeof arr>(array: T): ObjectElement[] {
  return array.map((el) => ({ [el[0]]: el[1] }));
}

const result = arrayToObject(arr);
console.log(JSON.stringify(result));
