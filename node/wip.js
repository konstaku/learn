function makeAdder(x) {
    return (y) => x + y;
}

const add10 = makeAdder(10);

console.log(add10(5));
