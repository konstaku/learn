const o = [];

o.__proto__ = { 0: 'a',  1: 'b', 2: 'c' };

for (const i in o) {
    console.log(o[i])
}