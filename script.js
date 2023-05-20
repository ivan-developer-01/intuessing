let minValue = parseInt(prompt("Минимальное знание числа для игры", "0"));
let maxValue = parseInt(prompt("Максимальное знание числа для игры", "100"));

const btns = {
    retry: document.querySelector("#btnRetry"),
    over: document.querySelector("#btnOver"),
    equal: document.querySelector("#btnEqual")
};

alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);

let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.querySelector("#orderNumberField");
const answerField = document.querySelector("#answerField");

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber}?`;

btns.retry.addEventListener("click", function() {
    minValue = 0;
    maxValue = 100;
    orderNumber = 0;
});

btns.over.addEventListener("click", function() {
    if (gameRun) {
        if (minValue === maxValue){
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;

            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${answerNumber}?`;
        }
    }
});

btns.equal.addEventListener("click", function () {
    if (gameRun) {
        answerField.innerText = `Я всегда угадываю\n\u{1F60E}`;
        gameRun = false;
    }
})

