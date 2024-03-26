// =========================================================================
// MODALS
// =========================================================================

// SHOWING MODALS
const btnAddNote = document.querySelector(".btn-add-note");

// BASE FOR MODALS
const modalShadow = document.querySelector(".modal__shadow");
const modalBtnClose = document.querySelector(".modal__btn-close");

// CREATED MODALS
const modalAddNote = document.querySelector(".modal__add-note");

const modalShow = (modal) => {
	modalShadow.classList.add("modal__shadow--visible");
	modal.classList.add("modal__box--visible");

	modalShadow.addEventListener("click", () => {
		modalHide(modal);
	});

	modalBtnClose.addEventListener("click", () => {
		modalHide(modal);
	});
};

const modalHide = (modal) => {
	modalShadow.classList.remove("modal__shadow--visible");
	modal.classList.remove("modal__box--visible");
};

// EVENT LISTENERS FOR CREATED MODALS

btnAddNote.addEventListener("click", () => {
	modalShow(modalAddNote);
});

// =========================================================================
// NOTES
// =========================================================================

const textNoNotes = document.querySelector(".note__no-notes-text");

const noteBtnSave = document.querySelector(".btn-save-note");

const noteSelect = document.querySelector(".modal__add-note__select");
const noteInput = document.querySelector(".modal__add-note__input");

const noteContainer = document.querySelector(".note__container");
const noteError = document.querySelector(".modal__add-note__error");

const noteCheck = () => {
	const noteCategory = noteSelect.value;
	const noteContent = noteInput.value;

	if (noteCategory == "nonselected" || noteContent == "") {
		noteError.classList.add("modal__add-note__error--visible");
	} else {
		noteError.classList.remove("modal__add-note__error--visible");
		noteSelect.value = "nonselected";
		noteInput.value = "";

		noteAdd(noteCategory, noteContent);
	}
};

const noteAdd = (category, content) => {
	let noteTitle;

	if (category == "grocery") {
		noteTitle = "Grocery";
	} else if (category == "work") {
		noteTitle = "Work";
	} else if (category == "other") {
		noteTitle = "Other";
	}

	noteContainer.innerHTML += `
		<div class="note__box note__box--${category}">
			<div class="note__box-top-part note__box-top-part--${category}">
				<span class="note__title">${noteTitle}</span>
				<button class="note__remove-btn"><i class="fa-solid fa-xmark"></i></button>
			</div>
			<div class="note__box-bottom-part"><p class="note__content">${content}</p></div>
		</div>
	`;

	const noteBtnRemove = document.querySelectorAll(".note__remove-btn");

	noteBtnRemove.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.target.parentElement.parentElement.parentElement.remove();
			countNotes();
		});
	});

	textNoNotes.classList.add("note__no-notes-text--hidden");

	modalHide(modalAddNote);
};

const countNotes = () => {
	const notesAll = document.querySelectorAll(".note__box");

	if (notesAll.length == 0) {
		textNoNotes.classList.remove("note__no-notes-text--hidden");
	}
};

noteBtnSave.addEventListener("click", () => {
	noteCheck();
});
