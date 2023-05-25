(async () => {
const greetings = `Добро пожаловать в Угадайку! 😎<br><br>
Здесь вам нужно загадать число в голове, а потом компьютер постарается угадать ваше число, за не более чем 20 шагов! 🫡<br><br>

Поддерживается управление клавишами. Вот список доступных клавиш:<br>

<ul>
    <li>M/Ь, O/Щ, стрелка вверх — Загаданное число больше числа компьютера</li>
    <li>L/Д, стрелка вниз — Загаданное число больше числа компьютера</li>
    <li>E/У, C/С, стрелка вправо — Загаданное число равняется числу компьютера</li>
    <li>R/К, стрелка влево — Перезапустить игру (только когда игра закончена)</li>
</ul>

Клавиши указываются в формате англБуква/русБуква, или, если это клавиши, то текстом. Клавиши нечувствительны к регистру. 😐<br><br>

Походу игры вы, возможно, поймёте лучше. Удачи! 😉`;

await alerts({
    modalMessage: greetings
});

const numberText = JSON.parse(document.querySelector("#numberTextContent").textContent);

let minValue;
let maxValue;

await requestMinMax();

const btns = {
    retry: document.querySelector("#btnRetry"),
    less: document.querySelector("#btnLess"),
    over: document.querySelector("#btnOver"),
    equal: document.querySelector("#btnEqual")
};

let answerNumber;
setAnswerNumber();

let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.querySelector("#orderNumberField");
const answerField = document.querySelector("#answerField");

displayContents();

btns.retry.addEventListener("click", async () => {
    //             если уже существует какой-то диалог, то зачем его вызывать снова?
    if (gameRun || document.querySelector(".modal-outer")) return;
    // request min&max
    await requestMinMax();
    // minValue = 0;
    // maxValue = 100;
    orderNumber = 1;
    setAnswerNumber();
    displayContents();
    gameRun = true;
});

// управление с клавиатуры
document.addEventListener("keyup", (event) => {
    let key = event.key.toUpperCase();

    if (key === "M" || key === "Ь" ||
        key === "O" || key === "Щ" ||
        key === "ARROWUP") btns.over.click();

    if (key === "L" || key === "Д" ||
        key === "ARROWDOWN") btns.less.click();

    if (key === "E" || key === "У" ||
        key === "C" || key === "С" ||
        key === "ARROWRIGHT") btns.equal.click();

    if (key === "R" || key === "К" ||
        key === "ARROWLEFT") btns.retry.click();
});

btns.less.addEventListener("click", () => {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.textContent = answerPhrase;
            setNotGameRun();
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            const answerNumberText = numberToText(answerNumber);
            orderNumber++;

            displayContents();
        }
    }
});

btns.over.addEventListener("click", () => {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.textContent = answerPhrase;
            setNotGameRun();
        } else {
            minValue = answerNumber + 1;
            setAnswerNumber();
            const answerNumberText = numberToText(answerNumber);
            orderNumber++;

            displayContents();
        }
    }
});

btns.equal.addEventListener("click", function () {
    if (gameRun) {
        answerField.textContent = `Я всегда угадываю\n\u{1F60E}`;
        setNotGameRun();
    }
});

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

function setAnswerNumber() {
    answerNumber = Math.floor((minValue + maxValue) / 2);
}

async function requestMinMax() {
    // minValue = parseInt(await libPrompt("Минимальное знание числа для игры", "0") || "0") || 0;
    await libPrompt("Минимальное знание числа для игры", "0").then(res => {
        const result = parseInt(res || "0") || 0;
        minValue = result;
    });
    // maxValue = parseInt(await libPrompt("Максимальное знание числа для игры", "100") || "100") || 100;
    await libPrompt("Максимальное знание числа для игры", "100").then(res => {
        const result = parseInt(res || "100") || 100;
        maxValue = result;
    });

    await libAlert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
}

function displayContents() {
    orderNumberField.textContent = orderNumber;
    answerField.textContent = `Вы загадали число ${numberToText(answerNumber)}?`;
}

function setNotGameRun() {
    gameRun = false;
}

function libAlert(message = "") {
    alerts({
        modalMessage: message
    });
}

async function libPrompt(message = "", defaultText = "") {
    return prompts({
        modalMessage: message,
        defaultText: defaultText
    });
}
})();