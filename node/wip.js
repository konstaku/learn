const lengths = []

for (let i = 0; i < 100; i++) {
    const arr = new Array(100).fill(0);
    const filledArr = arr.map(() => Math.floor(Math.random() * 100));
    const mySet = new Set();

    for (const el of filledArr) {
        mySet.add(el);
    }

    lengths.push(mySet.size);
}

console.log(lengths.reduce((acc, cur) => acc += cur) / lengths.length);
