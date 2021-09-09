const text = document.querySelector('.title');
const strText = text.textContent;
const splitText = strText.split("");

const text2 = document.querySelector('.title2');
const strText2 = text2.textContent;
const splitText2 = strText2.split("");


text.textContent = "";
text2.textContent = "";

for(let i=0; i < splitText.length; i++) {
    text.innerHTML += `<span class="span1">` + splitText[i] + "</span>";
}

let char = 0;
let timer = setInterval(onTick, 50);

function onTick() {
    const span = document.querySelectorAll('.span1')[char];
    span.classList.add('rotate');
    char++
    if(char === splitText.length) {
        complete();
        return
    }
}

for(let i=0; i < splitText2.length; i++) {
    text2.innerHTML += `<span class="span2">` + splitText2[i] + "</span>";
}

let char2 = 0;

setTimeout(function(){
    timer2 = setInterval(onTick2, 50);
}, 500)

function onTick2() {
    const span2 = document.querySelectorAll('.span2')[char2];
    span2.classList.add('fade');
    char2++
    if(char2 === splitText2.length) {
        complete2();
        return
    }
}

function complete(){
    clearInterval(timer);
    timer = null;
}

function complete2(){
    clearInterval(timer2);
    timer = null;
}