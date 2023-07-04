function isPalindrome(string) {
    const stack = [];

    for (let i = 0; i < Math.floor(string.length / 2); i++) {
        stack.push(string[i]);
    }

    for (let i = Math.ceil(string.length / 2); i < string.length; i++) {
        if (string[i] === stack[stack.length-1]) {
            stack.pop();
        } else {
            return false;
        }
    }

    return true;
}

console.log(isPalindrome('abccba'));
