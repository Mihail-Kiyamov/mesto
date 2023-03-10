const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const newName = document.querySelector('.popup__input_type_name');
const newAbout = document.querySelector('.popup__input_type_about');
const popupProfileEdit = document.querySelector('.popup_type_edit-profile');
const popupAddElement = document.querySelector('.popup_type_add-element');
export const popupShowImage = document.querySelector('.popup_type_show-image');
const profileEditButton = document.querySelector('.profile__edit-button');
const addElementButton = document.querySelector('.profile__add-button');
const popupEditProfileCloseButton = document.querySelector('.popup__close_type_edit-profile');
const popupAddElementCloseButton = document.querySelector('.popup__close_type_add-element');
const popupShowImageCloseButton = document.querySelector('.popup__close_type_show-image');
const popupEditProfileSubmitForm = document.querySelector('.popup__submit-form_type_edit-profile');
const popupAddElemetSubmitForm = document.querySelector('.popup__submit-form_type_add-element');
const elementsContainer = document.querySelector('.elements');
const newMestoName = document.querySelector('.popup__input_type_mesto-name');
const newMestoSrc = document.querySelector('.popup__input_type_mesto-src');

import {config, FormValidator} from './validate.js';
import {initialCards, Card} from './cards.js';


function showInitialElements() {
  initialCards.forEach(function (item) {
    const element = new Card(item.name, item.link, '#element-template');

    elementsContainer.append(element.generateCard());
  })
};

export function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByEscHandler);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupByEscHandler);
};

function closePopupByEscHandler(evt) {
  if (evt.code === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};

//Изменение Данных Профиля
function openPopupProfileEdit() {
  openPopup(popupProfileEdit);
  newName.value = profileName.textContent;
  newAbout.value = profileAbout.textContent;

  profileEditFormValidator.resetErrors();

  const submitButton = popupEditProfileSubmitForm.querySelector('.popup__submit');
  profileEditFormValidator.enableButton(submitButton);
};

function closePopupProfileEdit() {
  closePopup(popupProfileEdit);
};

function changeProfile(event) {
  event.preventDefault();
  profileName.textContent = newName.value;
  profileAbout.textContent = newAbout.value;
  closePopupProfileEdit();
};

//Добавление Новой Карточки
function openPopupAddElement() {
  openPopup(popupAddElement);

  popupAddElemetSubmitForm.reset();

  addCardFormValidator.resetErrors();

  const submitButton = popupAddElemetSubmitForm.querySelector('.popup__submit');
  addCardFormValidator.disableButton(submitButton);
};

function closePopupAddElement() {
  closePopup(popupAddElement);
};

function addNewElement(event) {
  event.preventDefault();

  const element = new Card(newMestoName.value, newMestoSrc.value, '#element-template');

  elementsContainer.prepend(element.generateCard());

  closePopupAddElement();
}

function closePopupShowImage() {
  closePopup(popupShowImage);
};

showInitialElements();

const profileEditFormValidator = new FormValidator(config, popupEditProfileSubmitForm);
profileEditFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, popupAddElemetSubmitForm);
addCardFormValidator.enableValidation();

//Слушатели для Редактирования Профиля
profileEditButton.addEventListener('click', openPopupProfileEdit);
popupEditProfileCloseButton.addEventListener('click', closePopupProfileEdit);
popupEditProfileSubmitForm.addEventListener('submit', changeProfile);

//Слушатели для добавления карточки
addElementButton.addEventListener('click', openPopupAddElement);
popupAddElementCloseButton.addEventListener('click', closePopupAddElement);
popupAddElemetSubmitForm.addEventListener('submit', addNewElement);

//Слушатель закрытия popup Картинки
popupShowImageCloseButton.addEventListener('click', closePopupShowImage);

//Закрытие попапа по клику оверлея
const closePopupByOverlayClick = evt => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

popupProfileEdit.addEventListener('click', closePopupByOverlayClick);

popupAddElement.addEventListener('click', closePopupByOverlayClick);

popupShowImage.addEventListener('click', closePopupByOverlayClick);