import { popupImage, openPopup } from "./index.js";

export class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _deleteCard(evt) {
    evt.target.closest(".element").remove();
  }
  _likeCard(evt) {
    evt.target.classList.toggle("element__like_active");
  }
  _popupItemOpen(evt) {
    document.querySelector(".popup-image__element").src = evt.target.src;
    document.querySelector(".popup-image__element").alt = evt.target.alt;
    document.querySelector(".popup-image__text").textContent = evt.target.alt;
    openPopup(popupImage);
  }
  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", (evt) => {
        this._likeCard(evt);
      });
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", (evt) => {
        this._deleteCard(evt);
      });
    this._element
      .querySelector(".element__foto")
      .addEventListener("click", (evt) => this._popupItemOpen(evt));
  }
  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__foto").src = this._link;
    this._element.querySelector(".element__foto").alt = this._name;
    this._element.querySelector(".element__text").textContent = this._name;
    return this._element;
  };
}
