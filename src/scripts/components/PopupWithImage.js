import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  open({ name, link }) {
    const image = this._popup.querySelector(".popup-image__element");
    const text = this._popup.querySelector(".popup-image__text");
    image.src = link;
    image.alt = name;
    text.textContent = name;
    super.open();
  }
}
