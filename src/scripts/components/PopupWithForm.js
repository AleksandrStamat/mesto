import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._inputForm = this._popup.querySelector(".popup__form");
    this._saveButton = this._popup.querySelector(".popup__button-save");
  }

  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
    this._formValues = {};
    this._inputList.forEach(
      (item) => (this._formValues[item.name] = item.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    this._inputForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const objectValues = this._getInputValues();
      this._submitForm(objectValues);
      this.close();
    });
  }
  close() {
    super.close();
    this._inputForm.reset();
  }
}
