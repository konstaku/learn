function findIntersections(array1, array2) {
    const intersection = [];

    for (const element1 of array1) {
        for (const element2 of array2) {
            if (element1 === element2) {
                intersection.push(element1);
                break;
            }
        }
    }

    return intersection;
}

const a = [2, 5, 7, 9, 3];
const b = [1, 5, 3, 7, 9, 0];

console.log(findIntersections(a, b));
