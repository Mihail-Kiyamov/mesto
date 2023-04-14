export default class Card {
  constructor(name, src, id, likeCounter, templateSelector, handleCardClick, handleDelete, handleLikeActive, handleLikeDisable) {
    this._name = name;
    this._src = src;
    this._id = id;
    this._likeCounter = likeCounter;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLikeActive = handleLikeActive;
    this._handleLikeDisable = handleLikeDisable;
  }

  generateCard(deleteStatus) {
    this._element = this._getTemplate();
    this._setEventListeners();
    if(!deleteStatus) {
      this._element.querySelector('.element__delete-button').remove();
    }

    this.image = this._element.querySelector('.element__image');
    this.image.src = this._src;
    this.image.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__like-button-counter').textContent = this._likeCounter;

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
    this._element.querySelector('.element__delete-button').addEventListener('click', () => { this._handleDelete(this) } );
    this._element.querySelector('.element__image').addEventListener('click', () => { this._handleCardClick(this._src, this._name) });
  }

  _likeToggle() {
    const likeButton = this._element.querySelector('.element__like-button');
    likeButton.classList.toggle('element__like-button_active');
    if(likeButton.classList.contains('element__like-button_active')) {
      this._handleLikeActive(this);
    } else {
      this._handleLikeDisable(this);
    }
  }

  setLikeValue(value) {
    this._element.querySelector('.element__like-button-counter').textContent = value;
  }

  deleteElement() {
    this._element.remove();
  }
};