function quickSort(array) {
    let pivot = array.length-1;
    let leftPointer = 0;
    let rightPointer = array.length-2;
    let temp;

    console.log('******** INPUT array:', array);

    do {
        while (array[leftPointer] < array[pivot]) {
            console.log(`leftPointer = ${leftPointer}, leftPointer++, array[leftpointer] =`, array[leftPointer]);
            leftPointer++;
        }
        console.log(`leftPointer = ${leftPointer}, cycle stopped, array[leftpointer] =`, array[leftPointer]);
    
        while (array[rightPointer] > array[pivot] && rightPointer > leftPointer) {
            console.log(`rightPointer = ${rightPointer}, rightPointer--, array[rightPointer] =`, array[rightPointer]);
            rightPointer--;
        }
        console.log(`rightPointer = ${rightPointer}, cycle stopped, array[rightPointer] =`, array[rightPointer]);
        
        temp = array[leftPointer];
        array[leftPointer] = array[rightPointer];
        array[rightPointer] = temp;
        console.log(`swapping left (${array[leftPointer]}) and right(${array[rightPointer]}): `, array);

    } while 
        (leftPointer < rightPointer);

    temp = array[pivot];
    array[pivot] = array[leftPointer];
    array[leftPointer] = temp;
    console.log(`leftPointer = ${leftPointer}, rightPointer = ${rightPointer}, swapping pivot and left`, array);

    console.log('******** OUTPUT array:', array);
    return array;
}

console.log(quickSort([0, 5, 2, 1, 6, 3]));
