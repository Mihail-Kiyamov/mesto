export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const showImageName = document.querySelector('.popup__image-name');
const showImage = document.querySelector('.popup__image');

import {openPopup, popupShowImage} from './index.js';

export class Card {
  constructor(name, src, templateSelector) {
    this._name = name;
    this._src = src;
    this._templateSelector = templateSelector;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._src;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    return this._element;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => { this._likeToggle() });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => { this._deleteElement() });
    this._element.querySelector('.element__image').addEventListener('click', () => { this._openPopupShowImage() });
  }

  _likeToggle() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _deleteElement() {
    this._element.remove();
  }

  _openPopupShowImage() {
    showImage.src = this._src;
    showImage.alt = this._name;
    showImageName.textContent = this._name;

    openPopup(popupShowImage);
  }
};