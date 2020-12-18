import "../pages/index.css";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm.js";
import Api from "../scripts/components/Api.js";
import {
  editButton,
  addButton,
  avatarButton,
  inputName,
  inputHobby,
  inputAvatar,
  validationObj,
  formProfile,
  formCard,
  token,
  baseUrl,
  groupId,
  formAvatar,
} from "../scripts/utils/constants.js";

let userId = "";

//! API
const api = new Api({
  token,
  baseUrl,
  groupId,
});

//! Подтверждение уделаения
const confirmPopup = new PopupWithConfirm(
  ".popup_confirm",
  (id, deleteCard) => {
    api
      .deleteCard(id)
      .then(() => {
        deleteCard();
        confirmPopup.close();
      })
      .catch((err) => console.log(err));
  }
);
confirmPopup.setEventListeners();
//!Валидация
const formValidatorProfile = new FormValidator(validationObj, formProfile);
formValidatorProfile.enableValidation();
const formValidatorCard = new FormValidator(validationObj, formCard);
formValidatorCard.enableValidation();
const formValidatorAvatar = new FormValidator(validationObj, formAvatar);
formValidatorAvatar.enableValidation();
//!!попап с картинкой и подписью
const imagePopup = new PopupWithImage(".popup-image");

//!!Функция нажатия на картинку
function handleCardClick(card) {
  imagePopup.open(card);
}
function handleLikeClick(id, status, like) {
  api
    .toggleLike(id, status)
    .then((res) => {
      like(res.likes);
    })
    .catch((err) => console.log(err));
}
function handleDeleteClick(id, deleteCard) {
  confirmPopup.open(id, deleteCard);
}
//!Функция создания карточки
const createCard = (item) => {
  const newCard = new Card(
    item,
    userId,
    "#templateElement",
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
  );
  return newCard.generateCard();
};

//!Создание карточек из массива
const cardSection = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      cardSection.addItemEnd(card);
    },
  },
  ".elements"
);

//!!получаем данные из полей
const user = new UserInfo({
  profileNameSelector: ".profile__name",
  profileHobbySelector: ".profile__hobby",
  profileAvatarSelector: ".profile__avatar",
});

//!!экземпляр класса с формой для попапа редкатирования профиля
const editProfilePopup = new PopupWithForm(".popup-profile", (object) => {
  formValidatorProfile.loading("Сохранение...");
  api
    .changeProfile(object)
    .then((res) => {
      user.setUserInfo(res);
      editProfilePopup.close();
      formValidatorProfile.finish("Сохранить");
    })
    .catch((err) => {
      formValidatorProfile.finish("Сохранить");
      console.log(err);
    });
});
const editAvatarPopup = new PopupWithForm(".popup_avatar", (object) => {
  formValidatorAvatar.loading("Сохраниние...");
  api
    .changeAvatar(object)
    .then((res) => {
      user.setUserInfo(res);
      editAvatarPopup.close();
      formValidatorAvatar.finish("Сохранить");
    })
    .catch((err) => {
      formValidatorAvatar.finish("Сохранить");
      console.log(err);
    });
});
//!!открытие попапа редактирвоания профиля и заполнение
const handleAvatar = () => {
  const link = user.getUserAvatar();
  inputAvatar.value = link;
  formValidatorAvatar.clearForm();
  editAvatarPopup.open();
};
avatarButton.addEventListener("click", handleAvatar);
editAvatarPopup.setEventListeners();

//!!открытие попапа редактирвоания профиля и заполнение
const addProfileInfo = () => {
  const userInfo = user.getUserInfo();
  inputName.value = userInfo.name;
  inputHobby.value = userInfo.about;
  formValidatorProfile.clearForm();
  editProfilePopup.open();
};
editButton.addEventListener("click", addProfileInfo);
editProfilePopup.setEventListeners();

//!!попап с формой добавления карточки
const handleCardPopup = new PopupWithForm(".popup-item", (item) => {
  formValidatorCard.loading("Создание...");
  api
    .addCard(item)
    .then((res) => {
      const card = createCard(res);
      cardSection.addItemBegin(card);
      handleCardPopup.close();
      formValidatorCard.finish("Создать");
    })
    .catch((err) => {
      formValidatorCard.finish("Создать");
      console.log(err);
    });
});
handleCardPopup.setEventListeners();

//!!Слушатель кнопки добавления
addButton.addEventListener("click", () => {
  formValidatorCard.clearForm();
  handleCardPopup.open();
});

Promise.all([api.getProfile(), api.getInitialCardgs()])
  .then(([info, cards]) => {
    userId = info._id;
    user.setUserInfo(info);
    cardSection.renderItems(cards);
  })
  .catch((err) => console.log(err));

/* 
createdAt: "2020-12-18T17:21:25.743Z"
likes: [{…}]
link: "https://i.playground.ru/p/g1IIE1sHVdGxcXVj9Jt5Qg.jpeg"
name: "RDR2"
owner: {name: "Sergey", about: "GuitarMan", avatar: "https://i.playground.ru/p/VsQbXl7daOuKtgMHwNjqRQ.jpeg", _id: "f9fb6a8b11925be1ef4743e5", cohort: "cohort-18"}
_id: "5fdce515580f8900dd192f73"


{name: "Jacques Cousteau", about: "Sailor, researcher", avatar: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg", _id: "fcf53f7e9363e11cc2337d63", cohort: "cohort-18"}

*/
