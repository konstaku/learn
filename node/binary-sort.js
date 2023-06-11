function binarySearch(array, value) {
    let lowerEnd = 0;
    let higherEnd = array.length - 1;

    while (array[lowerEnd] <= array[higherEnd]) {
        let midpoint = Math.floor((lowerEnd + higherEnd) / 2);

        // Value found, return
        if (+array[midpoint] === value) {
            console.log(`Midpoint found : *${midpoint}*, returning...`);
            return array[midpoint];
        }

        if (value < +array[midpoint]) {
            higherEnd = midpoint  - 1;
            continue;
        }

        if (value > +array[midpoint]) {
            lowerEnd = midpoint  + 1;
            continue;
        }
    }

    return 'Not found';
}

const set = new Set();

for (let i = 0; i < 10; i++) {
    set.add(Math.floor(Math.random() * 100));
}

const array = Array.from(set).sort((a, b) => +a - +b);
console.log('Sorted array:', array);

// const array = [
//    0,  1,  2,  6,  8,  9, 12, 13, 14, 16, 17, 19,
//   21, 22, 24, 26, 27, 28, 30, 31, 32, 33, 35, 36,
//   38, 39, 40, 43, 45, 47, 49, 50, 52, 53, 54, 55,
//   56, 57, 59, 61, 62, 65, 66, 67, 70, 72, 73, 77,
//   79, 80, 81, 82, 84, 85, 87, 88, 89, 90, 92, 93,
//   94, 99
// ];

console.log(binarySearch(array, 67));

