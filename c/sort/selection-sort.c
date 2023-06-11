#include <stdio.h>

void selectionSort(int array[], int arrayLength) {
    int leastSortedIndex = 0;
    int currentMinimumIndex = 0;
    int counter = 0;

    for (int i = 0; i < arrayLength - 1; i++) {
        currentMinimumIndex = leastSortedIndex;

        for (int j = leastSortedIndex; j < arrayLength; j++) {
            if (array[j] < array[currentMinimumIndex]) {
                currentMinimumIndex = j;
            }
        }

        if (array[currentMinimumIndex] < array[leastSortedIndex]) {
            int tmp = array[currentMinimumIndex];
            array[currentMinimumIndex] = array[leastSortedIndex];
            array[leastSortedIndex] = tmp;
        }

        leastSortedIndex++;
    }
}

int main() {
    int arrayLength = 10000;
    int array[arrayLength];

    for (int i = 0; i < arrayLength; i++) {
        array[i] = 1000000 - i;
    }

    selectionSort(array, arrayLength);

    for (int i = 0; i < arrayLength; i++) {
        printf("%i\n", array[i]);
    }
}
