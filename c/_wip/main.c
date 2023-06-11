#include <stdio.h>

void bubbleSort(int list[]) {
    list[0] = 12; 
}

int main() {
    int list[3] = {1, 2, 3};

    bubbleSort(list);

    printf("Number: %i\n", list[0]);

    return 0;
}
