export const formConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
export const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-43/',
  headers: {
    'Authorization': '6c4179cf-c3ec-4b62-8222-3e29a4a7f86c',
    'Content-Type': 'application/json',
  },
};

export const elementBody = document.querySelector('.root');
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const elementPopupEdit = document.querySelector('.popup_place_edit');
export const elementPopupAdd = document.querySelector('.popup_place_add');
export const elementAddButton = document.querySelector('.profile__add-button');
export const profileEditForm = document.querySelector('.popup__content');
export const profileEditFormAdd = document.querySelector('.popup__content_form_add');
export const profileEditAvatarForm = document.querySelector('.popup__content_form_avatar');
export const popups = document.querySelectorAll('.popup');
export const cardListSelector = '.elements__list';
export const popupImage = document.querySelector('.popup__img');
export const popupImageSign = document.querySelector('.popup__img-sign');
export const elementPopupImg = document.querySelector('.popup_place_img');
export const avatarElement = document.querySelector('.profile__avatar');
