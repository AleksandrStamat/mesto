let popup = document.querySelector('.popup');
let popupItem = document.querySelector('.popup-item')
let popupOpen = document.querySelector('.profile__edit');
let popupItemOpen = document.querySelector('.profile__add-button') // кнопка открытия попапа "Добавить"
let popupClose = popup.querySelector('.popup__close');
let popupItemClose = document.querySelector('.popup-item__close')
let name = document.querySelector('.profile__name');
let hobby = document.querySelector('.profile__hobby');
let popupSave = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('#name');
let hobbyInput = popup.querySelector('#hobby');

function openPopup(){
  nameInput.value = name.textContent;
  hobbyInput.value = hobby.textContent;
  popup.classList.add('popup_opened');
}
function closePopup(){
  popup.classList.remove('popup_opened');
}
function handlePopupSubmit(event) {
  event.preventDefault()
  name.textContent = nameInput.value;
  hobby.textContent = hobbyInput.value;
  closePopup();
}
function openPopupItem(){                     // функция открытия попаппа "Добавить"
  popupItem.classList.add('popup-item_opened');
}
function closeItemPopup(){
  popupItem.classList.remove('popup-item_opened');
}
popupOpen.addEventListener('click', openPopup);
popupItemOpen.addEventListener('click', openPopupItem); // слушатель попапа "Добавить"
popupClose.addEventListener('click', closePopup);
popupItemClose.addEventListener('click', closeItemPopup); // слушатель попапа "Добавить"

popupSave.addEventListener('submit', handlePopupSubmit);





