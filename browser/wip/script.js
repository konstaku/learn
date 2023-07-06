function makeSizer(size) {
    return function() {
        document.body.style.fontSize = `${size}px`;
    }
}

const size12 = makeSizer(12);
const size24 = makeSizer(24);
const size48 = makeSizer(48);

document.getElementById('size12').onclick = size12;
document.getElementById('size24').onclick = size24;
document.getElementById('size48').onclick = size48;
