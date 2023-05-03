const array = [];

for (let i = 0; i < 72; i++) {
    array.push(i);
}

function makeBatches(input, batchSize) {
    const result = [];
    result.push([]);
    let count = 0;
    let index = 0;

    for (let i = 0; i < input.length; i++) {
        if (count < batchSize) {
            result[index].push(input[i]);
            count++;
        } else {
            count = 0;
            i--;
            result[++index] = [];
            continue;
        }
    }

    return result;
}

let batchIndex = 0;

const batchedArray = (makeBatches(array, 30));

const interval = setInterval(displayBatches, 1000, batchedArray);

function displayBatches(array) {
    console.log(array[batchIndex]);
    batchIndex++;

    if (batchIndex >= batchedArray.length) {
        clearInterval(interval);
        console.log('all batches displayed!');
    }
}



