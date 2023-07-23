'use strict';
import { inflatableDiv } from '/inflatableBall.js';

const divs = [];

document.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        divs.push(new inflatableDiv(event, divs.length));
    }
});

document.addEventListener('mouseup', (event) => {
    const div = divs[divs.length - 1];
    div.stopInflating();
});
