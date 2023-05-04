
const max = 5;
let i = 0;

async function loop() {
    while (i < max) {
        console.log(i++);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('done');
    return 'hello';
} 

async function main() {
    const result = await loop();
    console.log(result);
}

main();
