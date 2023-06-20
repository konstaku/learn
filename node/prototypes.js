function showArgs() {
    console.log(arguments);
}

function sayHi(word) {
    console.log(word);   
}

Function.prototype.delay = function(ms) {
    return (...args) => setTimeout(() => this(...args), ms);
} 

const showArgsWithDelay = showArgs.delay(200);
showArgsWithDelay(1, 2, 3);

const sayHiDelay = sayHi.delay(500);
sayHiDelay('sdhfkjshf');
