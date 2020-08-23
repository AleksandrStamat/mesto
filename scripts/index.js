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
function openFormHandler() {
  openPopup(popupProfile)
  nameInput.value = profileName.textContent;
  hobbyInput.value = hobby.textContent;
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
  elementContainer.prepend(createElement(linkInput.value, placeInput.value));
  addForm.reset();
  closePopup(popupItem);
}

function clickTrash(evt) {
  // функция удаления слушателей
  const removeElement = evt.target.closest(".element");
  const trash = removeElement.querySelector(".element__trash");
  const likeButton = removeElement.querySelector(".element__like");
  const elementFoto = removeElement.querySelector(".element__foto");
  trash.removeEventListener("click", clickTrash);
  likeButton.removeEventListener("click", likeBtn);
  elementFoto.removeEventListener("click", openPopupImage);
  removeElement.remove();
}

function likeBtn(evt) {
  // функция лайка
  evt.target.classList.toggle("element__like_active");
}

function openPopupImage(link, name) {
  // функция открытия поапа картинки
  imageElement.src = link;
  imageText.textContent = name;
  openPopup(popupImage);
}

const createElement = (link, name) => {
  // создание карточки
  const cardElement = document
    .querySelector("#templateElement")
    .content.cloneNode(true);

  const elementFoto = cardElement.querySelector(".element__foto");
  elementFoto.addEventListener("click", () => openPopupImage(link, name)); // слушатель нажатия  на картинку

  elementFoto.src = link;
  cardElement.querySelector(".element__text").textContent = name;
  elementFoto.alt = name;

  const trash = cardElement.querySelector(".element__trash"); // кнопка удаления
  trash.addEventListener("click", clickTrash);

  const likeButton = cardElement.querySelector(".element__like"); //кнопка лайка
  likeButton.addEventListener("click", likeBtn);

  return cardElement;
};
initialCards.forEach(function (item) {
  // добавление карточек из массива
  elementContainer.append(createElement(item.link, item.name));
});

popupImageClose.addEventListener("click", () => closePopup(popupImage));
popupOpen.addEventListener("click", openFormHandler);
popupItemOpen.addEventListener("click", () => openPopup(popupItem)); // слушатель попапа "кнопки Добавить"
popupClose.addEventListener("click", () => closePopup(popupProfile));
popupItemClose.addEventListener("click", () => closePopup(popupItem)); // слушатель попапа "кнопки Добавить"
popupSave.addEventListener("submit", handlePopupSubmit);
popupItemSave.addEventListener("submit", handlePopupSubmitItem); // слушатель попапа "кнопки Добавить"
