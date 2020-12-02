export default class Card {
  constructor({ name, link }, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateElement = "#templateElement";
    this._clickImage = () => {
      handleCardClick({ name, link });
    };
    this._clickBasket = this._deleteCard.bind(this);
    this._clickLike = this._likeCard.bind(this);
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateElement)
      .content.querySelector("article")
      .cloneNode(true);
    return cardTemplate;
  }
  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", this._clickLike);
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", this._clickBasket);
    this._element
      .querySelector(".element__foto")
      .addEventListener("click", this._clickImage);
  }
  _deleteEventListeners() {
    this._element
      .querySelector(".element__like")
      .removeEventListener("click", this._clickLike);
    this._element
      .querySelector(".element__trash")
      .removeEventListener("click", this._clickBasket);
    this._element
      .querySelector(".element__foto")
      .removeEventListener("click", this._clickImage);
  }
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
  _likeCard() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }
  generateCard() {
    this._element = this._getTemplate();
    const foto = this._element.querySelector(".element__foto");
    foto.src = this._link;
    foto.alt = this._name;
    this._element.querySelector(".element__text").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}
