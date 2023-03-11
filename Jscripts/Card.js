import {popupShowImage} from './utils/constants.js';
import {openPopup} from './utils/utils.js';

const showImageName = popupShowImage.querySelector('.popup__image-name');
const showImage = popupShowImage.querySelector('.popup__image');

export class Card {
  constructor(name, src, templateSelector) {
    this._name = name;
    this._src = src;
    this._templateSelector = templateSelector;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this.image = this._element.querySelector('.element__image');
    this.image.src = this._src;
    this.image.alt = this._name;
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