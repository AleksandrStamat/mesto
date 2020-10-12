export class FormValidator {
  constructor(object, formElement) {
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._formElement = formElement;
  }
  _showInputError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
  _isValid(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        errorElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState(inputList, submitButton) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    }
  }
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(inputList, submitButton);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, submitButton);
      });
    });
  }
  enableValidation = (formElement) => {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}
