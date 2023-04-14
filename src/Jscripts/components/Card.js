export default class Card {
  constructor(name, src, id, likeCounter, isLiked, templateSelector, handleCardClick, handleDelete, handleLikeActive, handleLikeDisable) {
    this._name = name;
    this._src = src;
    this._id = id;
    this._likeCounter = likeCounter;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLikeActive = handleLikeActive;
    this._handleLikeDisable = handleLikeDisable;
    this._isLiked = isLiked;
  }

  generateCard(deleteStatus) {
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector('.element__delete-button');
    if(!deleteStatus) {
      this._deleteButton.remove();
    }

    this.image = this._element.querySelector('.element__image');
    this.image.src = this._src;
    this.image.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this._likeCounterElement = this._element.querySelector('.element__like-button-counter');
    this._likeCounterElement.textContent = this._likeCounter;
    this._likeButton = this._element.querySelector('.element__like-button');
    if(this._isLiked) {
      this._likeButton.classList.add('element__like-button_active') 
    }

    this._setEventListeners();
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
    this._likeButton.addEventListener('click', () => { this._likeToggle() });
    if(this._deleteButton) {
    this._deleteButton.addEventListener('click', () => { this._handleDelete(this) } );
    }
    this.image.addEventListener('click', () => { this._handleCardClick(this._src, this._name) });
  }

  _likeToggle() {
    if(!this._likeButton.classList.contains('element__like-button_active')) {
      this._handleLikeActive(this);
    } else {
      this._handleLikeDisable(this);
    }
  }

  setLikeValue(value) {
    this._likeCounterElement.textContent = value; 
  }

  deleteElement() {
    this._element.remove();
  }
};