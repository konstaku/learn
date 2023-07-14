let arr = [11, 5, 4, 61, 23, 66, 24, 10, 3, 7];
const result = new Array(arr.length);

arr.forEach((element, index) => {
    if (element % 2 === 0) {
        result[index] = element;
        delete arr[index];
    }
});

arr.sort((a, b) => a - b);
arr = arr.filter(element => element !== undefined)

for (let i = 0; i < result.length; i++) {
    if (result[i] === undefined) {
        result[i] = arr.shift();
    } else {
        continue;
    }
}

console.log(arr)
console.log(result)
