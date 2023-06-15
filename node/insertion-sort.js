function insertionSort(array) {
    let temp;

    for (let i = 1; i < array.length; i++) {
        console.log(`Iteration ${i}, array: ${array}`);

        const temp = array[i];
        let position = i;

        while (position > 0 || array[position-1] > temp) {
            array[position] = array[position-1];
            position--;
        }

        array[position] = temp;
    }

    return array;
}

console.log(insertionSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));
