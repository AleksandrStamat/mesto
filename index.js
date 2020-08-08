let popup = document.querySelector('.popup');
let popupOpen = document.querySelector('.profile__edit');
let popupClose = popup.querySelector('.popup__close');
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
popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
popupSave.addEventListener('submit', handlePopupSubmit);





