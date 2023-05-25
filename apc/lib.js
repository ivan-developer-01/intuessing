function prompts({ modalMessage = "Введите текст:",
		modalCancelBtnMessage = "Отмена",
		modalSubmitBtnMessage = "Отправить",
        defaultText = ""} = {}) {

	const modalOuter = document.createElement("div");
	modalOuter.classList.add("apcmodal-outer");

	const modalElem = document.createElement("div"),
		  modalBgElem = document.createElement("div"),
		  modalMessageElem = document.createElement("div"),
		  modalInputWrapper = document.createElement("div"),
		  modalInput = document.createElement("input"),
		  modalBtnWrapper = document.createElement("div"),
		  modalCancelBtn = document.createElement("button"),
		  modalSubmitBtn = document.createElement("button");
		  
	// add CSS classes
	modalBgElem.classList.add("apcmodal-bg");

	modalElem.classList.add("apcmodal");
	modalMessageElem.classList.add("apcmodal-message");
	modalInputWrapper.classList.add("apcmodal-input-wrapper");
	modalInput.classList.add("apcmodal-input");
	modalBtnWrapper.classList.add("apcmodal-btn-wrapper");
	modalCancelBtn.classList.add("apcmodal-cancel-btn");
	modalSubmitBtn.classList.add("apcmodal-submit-btn");

	[modalCancelBtn, modalSubmitBtn].forEach(btn => {
		btn.classList.add("apcmodal-btn");
	});

	// add nesting (add all elements to needed structure)
	modalBtnWrapper.appendChild(modalCancelBtn);
	modalBtnWrapper.appendChild(modalSubmitBtn);
	modalInputWrapper.appendChild(modalInput);
	modalElem.appendChild(modalMessageElem);
	modalElem.appendChild(modalInputWrapper);
	modalElem.appendChild(modalBtnWrapper);
	modalOuter.appendChild(modalBgElem);
	modalOuter.appendChild(modalElem);

	modalInput.setAttribute("type", "text");
    modalInput.value = defaultText;
	modalMessageElem.innerHTML = modalMessage;
	modalCancelBtn.textContent = modalCancelBtnMessage;
	modalSubmitBtn.textContent = modalSubmitBtnMessage;

	document.body.appendChild(modalOuter);

	function keyEsc(event) {
		if (event.key === "Escape") {
			remove();
		}
	}

	window.addEventListener("keydown", keyEsc);

	function remove() {
		modalOuter.remove();
		window.removeEventListener("keydown", keyEsc);
	}

	return new Promise((resolve, reject) => {
		modalCancelBtn.addEventListener("click", () => {
			resolve(null);
			remove();
		});

		modalSubmitBtn.addEventListener("click", () => {
			resolve(modalInput.value);
			remove();
		});

		modalInput.addEventListener("keyup", (event) => {
			if (event.key === "Enter") {
				modalSubmitBtn.click();
			}

			if (event.key === "Escape") {
				modalCancelBtn.click();
			}
		});

		modalInput.focus();
	});
}

function alerts({ modalMessage = "",
		modalSubmitBtnMessage = "OK"} = {}) {

	const modalOuter = document.createElement("div");
	modalOuter.classList.add("apcmodal-outer");

	const modalElem = document.createElement("div"),
		  modalBgElem = document.createElement("div"),
		  modalMessageElem = document.createElement("div"),
		  modalBtnWrapper = document.createElement("div"),
		  modalCloseBtn = document.createElement("div"),
		  modalSubmitBtn = document.createElement("button");
		  
	// add CSS classes
	modalBgElem.classList.add("apcmodal-bg");

	modalElem.classList.add("apcmodal");
	modalElem.classList.add("apcmodal-alert");
	modalMessageElem.classList.add("apcmodal-message");
	modalBtnWrapper.classList.add("apcmodal-btn-wrapper");
	modalCloseBtn.classList.add("apcmodal-close-button");
	modalSubmitBtn.classList.add("apcmodal-submit-btn");

	[modalSubmitBtn].forEach(btn => {
		btn.classList.add("apcmodal-btn");
	});

	// add nesting (add all elements to needed structure)
	modalElem.appendChild(modalCloseBtn);
	modalBtnWrapper.appendChild(modalSubmitBtn);
	modalElem.appendChild(modalMessageElem);
	modalElem.appendChild(modalBtnWrapper);
	modalOuter.appendChild(modalBgElem);
	modalOuter.appendChild(modalElem);

	modalMessageElem.innerHTML = modalMessage;
	modalCloseBtn.textContent = "✖";
	modalSubmitBtn.textContent = modalSubmitBtnMessage;

	document.body.appendChild(modalOuter);

	function keyEsc(event) {
		if (event.key === "Escape" || event.key === "Enter") {
			remove();
		}
	}

	window.addEventListener("keydown", keyEsc);

	function remove() {
		modalOuter.remove();
		window.removeEventListener("keydown", keyEsc);
	}

	return new Promise((resolve, reject) => {
		modalCloseBtn.addEventListener("click", () => {
			resolve();
			remove();
		});

		modalSubmitBtn.addEventListener("click", () => {
			resolve();
			remove();
		});

		modalSubmitBtn.focus();
	});
}

function confirms({ modalMessage = "Вы уверены?",
		modalCancelBtnMessage = "Нет",
		modalSubmitBtnMessage = "Да"} = {}) {

	const modalOuter = document.createElement("div");
	modalOuter.classList.add("apcmodal-outer");

	const modalElem = document.createElement("div"),
		  modalBgElem = document.createElement("div"),
		  modalMessageElem = document.createElement("div"),
		  modalBtnWrapper = document.createElement("div"),
		  modalCancelBtn = document.createElement("button"),
		  modalSubmitBtn = document.createElement("button");
		  
	// add CSS classes
	modalBgElem.classList.add("apcmodal-bg");

	modalElem.classList.add("apcmodal");
	modalElem.classList.add("apcmodal-confirm");
	modalMessageElem.classList.add("apcmodal-message");
	modalBtnWrapper.classList.add("apcmodal-btn-wrapper");
	modalCancelBtn.classList.add("apcmodal-cancel-btn");
	modalSubmitBtn.classList.add("apcmodal-submit-btn");

	[modalCancelBtn, modalSubmitBtn].forEach(btn => {
		btn.classList.add("apcmodal-btn");
	});

	// add nesting (add all elements to needed structure)
	modalBtnWrapper.appendChild(modalCancelBtn);
	modalBtnWrapper.appendChild(modalSubmitBtn);
	modalElem.appendChild(modalMessageElem);
	modalElem.appendChild(modalBtnWrapper);
	modalOuter.appendChild(modalBgElem);
	modalOuter.appendChild(modalElem);

	modalMessageElem.innerHTML = modalMessage;
	modalCancelBtn.textContent = modalCancelBtnMessage;
	modalSubmitBtn.textContent = modalSubmitBtnMessage;

	document.body.appendChild(modalOuter);

	function keyEsc(event) {
		if (event.key === "Escape") {
			remove();
		}
	}

	window.addEventListener("keydown", keyEsc);

	function remove() {
		modalOuter.remove();
		window.removeEventListener("keydown", keyEsc);
	}

	return new Promise((resolve, reject) => {
		modalCancelBtn.addEventListener("click", () => {
			resolve(false);
			remove();
		});

		modalSubmitBtn.addEventListener("click", () => {
			resolve(true);
			remove();
		});

		function keyEsc(event) {
			if (event.key === "Escape") {
				remove();
				resolve(false);
			}
		}
	
		window.addEventListener("keydown", keyEsc);

		modalSubmitBtn.focus();
	});
}