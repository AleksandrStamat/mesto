export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._setEventListeners();
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _handleClickClose() {
    this._popup.classList.remove("popup_opened");
  }
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }
  _setEventListeners() {
    this._popup
      .querySelector(".popup__button-close")
      .addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (evt) =>
      this._handleOverlayClose(evt)
    );
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }
}
