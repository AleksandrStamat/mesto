import Popup from "./Popup.js";
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
  }
  setEventListeners() {
    super._setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._idCard, this._deleteCard);
    });
  }
  open(id, deleteCard) {
    super.open();
    this._idCard = id;
    this._deleteCard = deleteCard;
  }
}
