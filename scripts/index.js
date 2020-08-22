const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
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

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function editProfileForm() {
  nameInput.value = profileName.textContent;
  hobbyInput.value = hobby.textContent;
  openPopup(popupProfile);
}

function closePopup(popup) {
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
  // функция создания карточки добавления пользователем
  evt.preventDefault();
  elementContainer.prepend(elementCreate(linkInput.value, placeInput.value));
  addForm.reset();
  closePopup(popupItem);
}

const elementCreate = (link, name) => {
  // создание карточки
  const cardElement = document
    .querySelector("#templateElement")
    .content.cloneNode(true);
  cardElement.querySelector(".element__foto").src = link;
  cardElement.querySelector(".element__text").textContent = name;
  cardElement.querySelector(".element__foto").alt = name;

  const trash = cardElement.querySelector(".element__trash"); // кнопка удаления
  trash.addEventListener("click", trashClick);

  const likeButton = cardElement.querySelector(".element__like"); //кнопка лайка
  likeButton.addEventListener("click", likeBtn);

  const elementFoto = cardElement.querySelector(".element__foto");
  elementFoto.addEventListener("click", () => popupImageOpen(link, name)); // слушатель нажатия  на картинку
  return cardElement;
};
initialCards.forEach(function (item) {
  // добавление карточек из массива
  elementContainer.append(elementCreate(item.link, item.name));
});

function trashClick(evt) {
  // функция удаления слушателей
  const removeElement = evt.target.closest(".element");
  const trash = removeElement.querySelector(".element__trash");
  const likeButton = removeElement.querySelector(".element__like");
  const elementFoto = removeElement.querySelector(".element__foto");
  trash.removeEventListener("click", trashClick);
  likeButton.removeEventListener("click", likeBtn);
  elementFoto.removeEventListener("click", popupImageOpen);
  removeElement.remove();
}

function likeBtn(evt) {
  // функция лайка
  evt.target.classList.toggle("element__like_active");
}

function popupImageOpen(link, name) {
  // функция открытия поапа картинки
  imageElement.src = link;
  imageText.textContent = name;
  openPopup(popupImage);
}

popupImageClose.addEventListener("click", () => closePopup(popupImage));
popupOpen.addEventListener("click", () => openPopup(popupProfile));
popupItemOpen.addEventListener("click", () => openPopup(popupItem)); // слушатель попапа "кнопки Добавить"
popupClose.addEventListener("click", () => closePopup(popupProfile));
popupItemClose.addEventListener("click", () => closePopup(popupItem)); // слушатель попапа "кнопки Добавить"
popupSave.addEventListener("submit", handlePopupSubmit);
popupItemSave.addEventListener("submit", handlePopupSubmitItem); // слушатель попапа "кнопки Добавить"
