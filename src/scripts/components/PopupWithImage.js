import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup-image__element");
    this._text = this._popup.querySelector(".popup-image__text");
  }
  open({ name, link }) {
    this._image.src = link;
    this._image.alt = name;
    this._text.textContent = name;
    super.open();
  }
}
