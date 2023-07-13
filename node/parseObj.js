const myString = "user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue&experiments.theme=dark";

function stringToObject(string) {
    const result = {};

    // Split string into statements
    const statements = string.split('&');

    for (const statement of statements) {
        let [keys, value] = statement.split('=');
        let current = result;

        keys = keys.split('.');
        value = value.split('%20').join(' ');

        for (let i = 0; i < keys.length; i++) {
            if (i === keys.length - 1) {
                current[keys[i]] = value;
                break;
            }

            current[keys[i]] = current[keys[i]] || {};
            current = current[keys[i]];
        }
    }

    return result;
}

console.log(stringToObject(myString));
