const dictionary = {
    ')': '(',
    '}': '{', 
    ']': '[',
};

function hasErrors(code) {
    const stack = [];

    for (const char of code) {
        console.log('stack:', stack);

        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
            continue;
        } 

        if (char === ')' || char === '}' || char === ']') {
            if (dictionary[char] === stack[stack.length-1]) {
                stack.pop();
                continue;
            } else {
                console.log('Error! opening parentheses missing for char', char);
            }
        }
    }

    return stack.length === 0 ? 'No errors!' : 'Has errors';
}

console.log(hasErrors('()()()()())'));
