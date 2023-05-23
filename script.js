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
        if (minValue === maxValue) {
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
});

const numberText = JSON.parse(document.querySelector("#numberTextContent").textContent);

function numberToText(n) {
	let stringDigit = "";
	let nStr = n.toString();
    let originalN = n;
	n = Math.abs(n);

	if (nStr.startsWith("-")) {
		// проверяем, чтобы число было в диапазоне, чтобы не получилось "минус "
		stringDigit += (-n >= -999) ? "минус " : ""; // пробел тут обязателен
		nStr = nStr.slice(1);
	}

	// ща как сделаю!
	if ((n >= 1 && n <= 19) || 
		(n <= -1 && n >= -19)) {
		stringDigit += numberText[n];
	} else if ((n >= 20 && n <= 99) || 
			   (n <= -20 && n >= -99)) {
		stringDigit += numberText[nStr[0] + "0"];
		if (!n.toString().endsWith("0")) {
			stringDigit += " " + numberText[n % 10];
		}
	} else if ((n >= 100 && n <= 999) || 
			   (n <= -100 && n >= -999)) {
		stringDigit += numberText[nStr[0] + "00"];

		let twoSignN = (n % 100).toString();

		// проверяем остаток, например, если n = 123, то остаток будет 23
		if (twoSignN >= 1 && twoSignN <= 19) {
			stringDigit += " " + numberText[twoSignN];
		} else {
			stringDigit += " " + numberText[twoSignN[0] + "0"];
		}
	
		if (!nStr.endsWith("0") && (twoSignN >= 20 && twoSignN <= 99)) {
			stringDigit += " " + numberText[twoSignN[1]];
		}
	}

	stringDigit = stringDigit.replaceAll("  ", " ");
	stringDigit = stringDigit.trim();

	let strDigitLength = stringDigit.length;

	if (strDigitLength >= 21) {
		stringDigit = n;
	}

	return stringDigit || originalN;
}
