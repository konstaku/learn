const promises = [];

for (let i = 1; i <= 5; i++) {
    promises.push(fetch(`https://dummyjson.com/products/${i}`));
}

function promiseAll(promises) {
    const results = [];
    let count = 0;

    return new Promise(function(resolve, reject) {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(result => {
                count++;
                results[i] = result;

                if (count === promises.length) {
                    resolve(results);
                }
            })
                .catch(error => reject(error));
        }
    });
}

promiseAll(promises)
    // .then(responses => promiseAll(responses.map(el => el.json())))
    .then(result => console.log('result:', result))
    .catch(console.error);
