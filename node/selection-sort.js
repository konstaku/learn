function selectionSort(array) {
    let alreadySortedIndex = 0;
    let currentMinimumIndex = 0;
    let sorted = false;

    while (!sorted) {
        console.log(`Iteration #${alreadySortedIndex}`);

        for (let i = alreadySortedIndex; i < array.length; i++) {
            // Iterating through an array and saving current minimum
            if (array[i] < array[currentMinimumIndex]) {
                currentMinimumIndex = i;
            }
        }

        // If there remains a value less than current minimum, swap'em
        if (arr[currentMinimumIndex] < array[alreadySortedIndex]) {
            console.log(`Swapping ${array[currentMinimumIndex]} with ${array[alreadySortedIndex]}`);
            let temp = array[currentMinimumIndex];
            array[currentMinimumIndex] = array[alreadySortedIndex];
            array[alreadySortedIndex] = temp;
        } else {
            sorted = true;
        }

        alreadySortedIndex++;
    }

    return array;
}

const arr = [9, 8, 7, 6, 11, 5, 4, 3, 2, 1];
console.log(selectionSort(arr));
