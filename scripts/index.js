let popup = document.querySelector('.popup-profile');
let popupItem = document.querySelector('.popup-item')
let popupOpen = document.querySelector('.profile__edit');
let popupItemOpen = document.querySelector('.profile__add-button') // кнопка открытия попапа "Добавить"
let popupClose = popup.querySelector('#popup-profile-close');
let popupItemClose = document.querySelector('#popup-item-close') // кнопка закрытия попапа "Добавить"
let name = document.querySelector('.profile__name');
let hobby = document.querySelector('.profile__hobby');
let popupSave = popup.querySelector('.popup__form');
let popupItemSave = document.querySelector('#add-item'); // кнопка сохранения попапа "Добавить"
let nameInput = popup.querySelector('#name'); 
let hobbyInput = popup.querySelector('#hobby');

function openPopup(){
  nameInput.value = name.textContent;
  hobbyInput.value = hobby.textContent;
  popup.classList.add('popup-profile_opened');
}
function closePopup(){
  popup.classList.remove('popup-profile_opened');
}
function handlePopupSubmit(event) {
  event.preventDefault()
  name.textContent = nameInput.value;
  hobby.textContent = hobbyInput.value;
  closePopup();
}
function handlePopupSubmitItem(evt) { // кнопка "Добавить"
  event.preventDefault()
  closeItemPopup();
}

function openPopupItem(){                     // кнопка "Добавить"
  popupItem.classList.add('popup-item_opened'); // кнопка "Добавить"
}
function closeItemPopup(){
  popupItem.classList.remove('popup-item_opened'); // кнопка "Добавить"
}
popupOpen.addEventListener('click', openPopup);
popupItemOpen.addEventListener('click', openPopupItem); // слушатель попапа "Добавить"
popupClose.addEventListener('click', closePopup);
popupItemClose.addEventListener('click', closeItemPopup); // слушатель попапа "Добавить"
popupSave.addEventListener('submit', handlePopupSubmit);
popupItemSave.addEventListener('submit',handlePopupSubmitItem);// слушатель попапа "Добавить"

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
let elementContainer = document.querySelector('.elements');
let elementCreate = element => {
  let cardElement = document.querySelector('#templateElement').content.cloneNode(true);
  cardElement.querySelector('.element__text').textContent = element.name;
  cardElement.querySelector('.element__foto').src = element.link;
  elementContainer.append(cardElement);
}
initialCards.forEach(elementCreate);


let placeInput = document.querySelector('#place'); // кнопка "Добавить"
let linkInput = document.querySelector('#link'); // кнопка "Добавить"
let addForm = document.querySelector('#add-item');
let addElement = evt => {
  evt.preventDefault();
  let placeValue = placeInput.value;
  let linkValue = linkInput.value;
  let newElement = {name: placeValue, link: linkValue};
  elementCreate(newElement);
}
addForm.addEventListener('submit', addElement);







