function sortableArray(array) {
    const start = 0;
    const end = array.length - 1;
    let iterations = 0;

    quickSort (start, end);

    function quickSort(start, end) {
        if (end - start <= 0) {
            return;
        }

        const pivotPosition = partition(start, end);

        quickSort (start, pivotPosition - 1);
        quickSort (pivotPosition + 1, end);
    }

    function partition(start, end) {
        let leftPointer = start;
        let pivotPointer = end;
        let rightPointer = pivotPointer - 1;

        const pivot = array[pivotPointer];

        console.log(`Array: \t[${array}]\nleftPointer: ${leftPointer}\nrightPointer: ${rightPointer}\npivotPointer: ${pivotPointer}\n`);

        while (true) {
            while (array[leftPointer] < pivot) {
                leftPointer++;
            }

            while (array[rightPointer] > pivot) {
                rightPointer--;
            }

            if (leftPointer >= rightPointer) {
                break;
            }

            swap (leftPointer, rightPointer);
        }

        swap(leftPointer, pivotPointer);
        iterations++;

        return leftPointer;
    }

    function swap(a, b) {
        console.log(`Swapping ${array[a]} and ${array[b]}...\n`);
        const tempValue = array[a];
        array[a] = array[b];
        array[b] = tempValue;
    }

    console.log(`Sorting done in ${iterations} iterations.`);
}

const myArray = [76, 12, 50, 46, 71, 94, 48, 28, 23, 55, 65, 10, 39, 26, 34, 1, 99, 89, 72, 32, 77];
sortableArray(myArray);
