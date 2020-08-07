let popup = document.querySelector('.popup');
let popupOpen = document.querySelector('.profile__edit');
let popupClose = popup.querySelector('.popup__close');
let name = document.querySelector('.profile__name');
let hobby = document.querySelector('.profile__hobby');
let popupSave = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('#name');
let hobbyInput = popup.querySelector('#hobby');

function popupOpened(){
  popup.classList.add('popup_opened');
  nameInput.value = name.textContent;
  hobbyInput.value = hobby.textContent;
}
function popupClosed(){
  popup.classList.remove('popup_opened');
}
function popupSubmitHandler(event) {
  event.preventDefault()
  name.textContent = nameInput.value;
  hobby.textContent = hobbyInput.value;
  popupClosed ()
}
popupOpen.addEventListener('click', popupOpened);
popupClose.addEventListener('click', popupClosed);
popupSave.addEventListener('submit', popupSubmitHandler);





