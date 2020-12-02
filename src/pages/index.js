import "../pages/index.css";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  editButton,
  addButton,
  inputName,
  inputHobby,
  validationObj,
  initialCards,
  formProfile,
  formCard,
} from "../scripts/utils/constants.js";
//!Валидация
const formValidatorProfile = new FormValidator(validationObj, formProfile);
formValidatorProfile.enableValidation();
const formValidatorCard = new FormValidator(validationObj, formCard);
formValidatorCard.enableValidation();

//!!попап с картинкой и подписью
const imagePopup = new PopupWithImage(".popup-image");

//!!Функция нажатия на картинку
function handleCardClick(card) {
  imagePopup.open(card);
}

//!Функция создания карточки
const createCard = (item) => {
  const newCard = new Card(item, handleCardClick);
  return newCard.generateCard();
};

//!Создание карточек из массива
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardSection.addItem(card);
    },
  },
  ".elements"
);
cardSection.renderItems();
//!!получаем данные из полей
const defaultUserInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileHobbySelector: ".profile__hobby",
});

//!!экземпляр класса с формой для попапа редкатирования профиля
const editProfilePopup = new PopupWithForm(".popup-profile", (object) => {
  defaultUserInfo.setUserInfo(object);
});

//!!открытие попапа редактирвоания профиля и заполнение
const addProfileInfo = () => {
  const userInfo = defaultUserInfo.getUserInfo();
  inputName.value = userInfo.name;
  inputHobby.value = userInfo.hobby;
  formValidatorProfile.clearForm();
  editProfilePopup.open();
};
editButton.addEventListener("click", addProfileInfo);
editProfilePopup.setEventListeners();

//!!попап с формой добавления карточки
const handleCardPopup = new PopupWithForm(".popup-item", (item) => {
  const card = createCard(item);
  cardSection.addItem(card);
});
handleCardPopup.setEventListeners();

//!!Слушатель кнопки добавления
addButton.addEventListener("click", () => {
  formValidatorCard.clearForm();
  handleCardPopup.open();
});
