const a = 1;


function foo() {
    const func = () => console.log(a);

    const a = 2;
    setTimeout(func);
}

foo();
