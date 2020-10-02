import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js";

const popupProfile = document.querySelector(".popup-profile");
const popupItem = document.querySelector(".popup-item");
const popupImage = document.querySelector(".popup-image");

const profileName = document.querySelector(".profile__name");
const hobby = document.querySelector(".profile__hobby");
const placeInput = document.querySelector("#place");
const linkInput = document.querySelector("#link");
const nameInput = document.querySelector("#name");
const hobbyInput = document.querySelector("#hobby");

const elementContainer = document.querySelector(".elements");
const addForm = document.querySelector("#add-item");

const imageElement = document.querySelector(".popup-image__element");
const imageText = document.querySelector(".popup-image__text");

const popupImageClose = document.querySelector("#popup-image-close");
const popupClose = document.querySelector("#popup-profile-close");
const popupItemClose = document.querySelector("#popup-item-close"); // кнопка закрытия попапа "Добавить"

const popupOpen = document.querySelector(".profile__edit");
const popupItemOpen = document.querySelector(".profile__add-button"); // кнопка открытия попапа "Добавить"

const popupSave = document.querySelector(".popup__form");
const popupItemSave = document.querySelector("#add-item"); // кнопка сохранения попапа "Добавить"

const buttonSaveProfile = document.querySelector("#popup-profile-save");
const buttonSaveItem = document.querySelector("#popup-item-save");

const formSelector = ".popup__form"; 

function openPopup(popup) {
  document.addEventListener("keyup", closeEscape);
  document.addEventListener("click", closeMouse);
  popup.classList.add("popup_opened");
}
function openFormHandler() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  hobbyInput.value = hobby.textContent;
  buttonSaveProfile.classList.remove("popup__button-save_inactive");
}

function closePopup(popup) {
  document.removeEventListener("keyup", closeEscape);
  document.removeEventListener("click", closeMouse);
  popup.classList.remove("popup_opened");
}

function handlePopupSubmit(evt) {
  // функция создания карточки профиля пользователем
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  hobby.textContent = hobbyInput.value;
  closePopup(popupProfile);
}
function handlePopupSubmitItem(evt) {
  // функция создания карточки пользователем
  evt.preventDefault();
  const item = {
    link: linkInput.value,
    name: placeInput.value,
  };
  const card = new Card(item, "#templateElement");
  const cardElement = card.generateCard();
  elementContainer.prepend(cardElement);
  addForm.reset();
  closePopup(popupItem);
}

function openPopupImage(data) {
  // функция открытия поапа картинки
  imageElement.src = data.link;
  imageElement.alt = data.name;
  imageText.textContent = data.name;
  openPopup(popupImage);
}
// создание теплейта
initialCards.forEach((item) => {
  const card = new Card(item, "#templateElement");
  const cardElement = card.generateCard();
  elementContainer.prepend(cardElement);
});

// валидация форм
const formList = Array.from(document.querySelectorAll(formSelector));
const validationObj = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
};
formList.forEach((formElement) => {
const formValidator = new FormValidator(validationObj, formElement);
formValidator.enableValidation();
});


// закрытие попапов на нажание Esc и на клик по overlay
const popupArray = Array.from(document.querySelectorAll(".popup"));

function closeEscape(evt) {
  if (evt.key === "Escape") {
    popupArray.forEach((popup) => {
      if (popup.classList.contains("popup_opened")) {
        closePopup(popup);
      }
    });
  }
}

function closeMouse(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

popupImageClose.addEventListener("click", () => closePopup(popupImage));
popupOpen.addEventListener("click", openFormHandler);
popupItemOpen.addEventListener("click", () => {
  buttonSaveItem.classList.add("popup__button-save_inactive");
  buttonSaveItem.disabled = true;
  openPopup(popupItem);
}); // слушатель попапа "кнопки Добавить"
popupClose.addEventListener("click", () => closePopup(popupProfile));
popupItemClose.addEventListener("click", () => closePopup(popupItem)); // слушатель попапа "кнопки Добавить"
popupSave.addEventListener("submit", handlePopupSubmit);
popupItemSave.addEventListener("submit", handlePopupSubmitItem); // слушатель попапа "кнопки Добавить"
