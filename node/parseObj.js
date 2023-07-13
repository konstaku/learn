
const inData = "user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue&experiments.theme=dark";
const expressions = inData.split('&');

const result = {};

for (const expression of expressions) {
    const splittedExpression = expression.split('=');
    const key = splittedExpression[0];
    const value = splittedExpression[1].split('%20').join(' ');
    // key: user.name.firstname
    // value: Bob

    const keys = key.split('.');
    // keys: ['user', 'name', 'firstName']

    let current = result;

    for (let i = 0; i < keys.length; i++) {
        if (i < keys.length - 1) {
            current[keys[i]] = current[keys[i]] || {};
            current = current[keys[i]];
        } else {
           current[keys[i]] = value;
           current = result;
        }
    }

}

console.log('Result:', result);
