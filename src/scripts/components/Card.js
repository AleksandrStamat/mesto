export default class Card {
  constructor(
    { name, link, _id, likes, owner },
    userId,
    cardSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._userId = userId;
    this._templateElement = cardSelector;
    this._isMyCard = userId === owner._id;
    this._clickImage = () => handleCardClick({ name, link });
    this._clickBasket = () => handleDeleteClick(_id, () => this._deleteCard());
    this._clickLike = () =>
      handleLikeClick(
        _id,
        this._element
          .querySelector(".element__like")
          .classList.contains("element__like_active"),
        (arr) => {
          this._likeCard(arr);
        }
      );
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
    this._deleteEventListeners();
    this._element.remove();
    this._element = null;
  }
  _likeCard(arr) {
    if (arr.some((like) => like._id === this._userId)) {
      this._element
        .querySelector(".element__like")
        .classList.add("element__like_active");
    } else {
      this._element
        .querySelector(".element__like")
        .classList.remove("element__like_active");
    }
    this._element.querySelector(".element__like-count").textContent =
      arr.length;
  }
  generateCard() {
    this._element = this._getTemplate();
    if (!this._isMyCard) {
      this._element
        .querySelector(".element__trash")
        .classList.add("element__trash_display");
    }
    const foto = this._element.querySelector(".element__foto");
    foto.src = this._link;
    foto.alt = this._name;
    this._likeCard(this._likes);
    this._element.querySelector(".element__text").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}
