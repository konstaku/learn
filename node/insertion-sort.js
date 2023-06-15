/*
algorithm:

1. Select index starting 1
    i = 1
    [4, 3, 2, 1]
        ^
    
2. Store the array value at index in temp variable, write null
    i = 1
    temp = 3
    [4, x, 2, 1]

3. Compare temp value with the values to the left, starting from i - 1 and until 0. 
    If the value to the left is larger then temp:
        1. Move value to the left one step to the right, write null to value
        2. Repeat comparison with next left value
    If the value to the left is less then temp, go to next iteration
    If the array ended, go to next iteration

 
*/

function insertionSort(array) {
    let temp;

    for (let i = 1; i < array.length; i++) {
        console.log(`Iteration ${i}, array: ${array}`);

        const temp = array[i];
        array[i] = null;

        for (let j = i; j > 0; j--) {
            if (array[j-1] > temp) {
                array[j] = array[j-1];
                array[j-1] = null;
            } 
        }

        array[array.indexOf(null)] = temp;
    }

    return array;
}

console.log(insertionSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));
