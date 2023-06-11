function bubbleSort(arr) {
    let x = 0;
    let y = 1;
    let lastSorted = arr.length - 1;
    let sorted = false;
    let iteration = 0;
    
    while (!sorted) {
        sorted = true;

        for (let i = 0; i < lastSorted; i++) {
            if (arr[i] > arr[i + 1]) {
                sorted = false;
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }

        console.log(`Iteration #${iteration++}...`);
        lastSorted--;
    }

    return arr;
}

const set = new Set();

for (let i = 0; i < 100000; i++) {
    set.add(Math.floor(Math.random() * 100000));
}

const array = Array.from(set);

console.log('set:', array);

console.log(bubbleSort(array));

