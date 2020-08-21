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
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
];

const elementContainer = document.querySelector('.elements');
const addForm = document.querySelector('#add-item')
  const elementCreate = element =>{                // функция добавления карточки
  const cardElement = document.querySelector('#templateElement').content.cloneNode(true);
  cardElement.querySelector('.element__text').textContent = element.name;
  cardElement.querySelector('.element__foto').src = element.link;
  cardElement.querySelector('.element__trash').addEventListener('click', evt => {
    const trash = event.target.closest('.element');         //удаление карточки
    trash.remove()
  })
  const likeButton = cardElement.querySelector('.element__like');   //лайк
  function likeBtn (evt) {
    evt.target.classList.toggle('element__like_active')
  } 
  likeButton.addEventListener('click',likeBtn);

  elementContainer.prepend(cardElement);
}
initialCards.forEach(elementCreate);

const placeInput = document.querySelector('#place'); // 
const linkInput = document.querySelector('#link'); 
addForm.addEventListener('submit', evt => {         // функция созданя карточки
  event.preventDefault();
  const placeValue = placeInput.value;
  const linkValue = linkInput.value;
  const newElement = {name: placeValue, link: linkValue};
  elementCreate(newElement);
  addForm.reset ()
})




