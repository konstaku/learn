function inc(arr) {
    if (arr[arr.length-1] === 9) {
        return move(arr, arr.length-1);
    } else {
        arr[arr.length-1] += 1;
    }

    return arr;

    function move(array, index) {
        array[index] = 0;

        if (array[index-1] >= 0 && array[index-1] < 9) {
            array[index-1]++;
        } else if (array[index-1] === 9) {
            move(array, index-1);
        } else {
            array.unshift(1);
        }

            return array;
        }
}

console.log(inc([7, 8, 9, 9]));
