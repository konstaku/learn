'use strict';
const header = document.getElementById('header');
const myDiv = document.createElement('div');

myDiv.style.fontSize = 24 + 'px';

header.append(myDiv);

document.addEventListener('click', leaveMark);

function leaveMark(event) {
    const div = document.createElement('div');
    div.style.backgroundColor = 'black';
    div.style.position = 'absolute';
    div.style.left = event.x - 50 + 'px';
    div.style.top = event.y - 50 + 'px';
    div.style.borderRadius = 50 + 'px';
    div.style.height = 100 + 'px';
    div.style.width = 100 + 'px';
    document.body.append(div);
}
