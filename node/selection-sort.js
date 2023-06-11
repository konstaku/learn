function selectionSort(array) {
    let alreadySortedIndex = 0;
    let currentMinimumIndex = 0;

    for (let i = 0; i < array.length - 1; i++) {
        console.log(`Iteration #${alreadySortedIndex}`);
        currentMinimumIndex = alreadySortedIndex;

        for (let j = alreadySortedIndex; j < array.length; j++) {
            // Iterating through an array and saving current minimum
            if (array[j] < array[currentMinimumIndex]) {
                currentMinimumIndex = j;
            }
        }

        // If there remains a value less than current minimum, swap'em
        if (arr[currentMinimumIndex] < array[alreadySortedIndex]) {
            console.log(`Swapping ${array[currentMinimumIndex]} with ${array[alreadySortedIndex]}`);
            let temp = array[currentMinimumIndex];
            array[currentMinimumIndex] = array[alreadySortedIndex];
            array[alreadySortedIndex] = temp;
        } 

        alreadySortedIndex++;
    }

    return array;
}

const arr = [3, 2, 1, 15, 4, 42, 100, 99, 1001, 8];
console.log(selectionSort(arr));
