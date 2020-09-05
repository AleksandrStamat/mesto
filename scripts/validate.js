// показываем ошибку//
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass,errorClass, ...rest}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

//убираем ошибку//
const hideInputError = (formElement, inputElement, {inputErrorClass,errorClass, ...rest}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};
//проверяем на валидность//
const checkValidity = (formElement, inputElement,{...rest}) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage,rest);
  } else {
    hideInputError(formElement, inputElement,rest);
  }
};
//слушатели событий//
const setEventListeners = (formElement, {inputSelector,submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement,rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement,rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};
//проверяем на ошибку//
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
})
}
//переключаем кнопки//
const toggleButtonState = (inputList, buttonElement,{inactiveButtonClass}) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled')
  }
}
//валидация для всех форм//
const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
      setEventListeners(formElement, rest);
    })
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
});