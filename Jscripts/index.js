const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const newName = document.querySelector('.popup__input_type_name');
const newAbout = document.querySelector('.popup__input_type_about');
const popupProfileEdit = document.querySelector('.popup_type_edit-profile');
const popupAddElement = document.querySelector('.popup_type_add-element');
const popupShowImage = document.querySelector('.popup_type_show-image');
const profileEditButton = document.querySelector('.profile__edit-button');
const addElementButton = document.querySelector('.profile__add-button');
const popupEditProfileCloseButton = document.querySelector('.popup__close_type_edit-profile');
const popupAddElementCloseButton = document.querySelector('.popup__close_type_add-element');
const popupShowImageCloseButton = document.querySelector('.popup__close_type_show-image');
const popupEditProfileSubmitButton = document.querySelector('.popup__submit-form_type_edit-profile');
const popupAddElemetSubmitButton = document.querySelector('.popup__submit-form_type_add-element');
const elementsContainer = document.querySelector('.elements');
const newMestoName = document.querySelector('.popup__input_type_mesto-name');
const newMestoSrc = document.querySelector('.popup__input_type_mesto-src');
const showImageName = document.querySelector('.popup__image-name');
const showImage = document.querySelector('.popup__image');


const initialCards = [
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

const elementTemplate = document.querySelector('#element-template').content;

function showElements() {
  initialCards.forEach(function (item) {
    const element = createElement(item.name, item.link);

    elementsContainer.append(element);
  })
};

function createElement(name, src) {
  const imageElement = elementTemplate.querySelector('.element').cloneNode(true);

  imageElement.querySelector('.element__image').src = src;
  imageElement.querySelector('.element__image').alt = name;
  imageElement.querySelector('.element__name').textContent = name;
  imageElement.querySelector('.element__like-button').addEventListener('click', likeToggle);
  imageElement.querySelector('.element__delete-button').addEventListener('click', deleteElement)
  imageElement.querySelector('.element__image').addEventListener('click', openPopupShowImage)

  return (imageElement);
};

function openPopup(popup) {
  popup.classList.add('popup_opened');  
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Изменение Данных Профиля
function openPopupProfileEdit() {
  openPopup(popupProfileEdit);
  newName.value = profileName.textContent;
  newAbout.value = profileAbout.textContent;
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
};

function closePopupAddElement() {
  closePopup(popupAddElement);
};

function addNewElement(event) {
  event.preventDefault();

  const element = createElement(newMestoName.value, newMestoSrc.value);

  elementsContainer.prepend(element);

  popupAddElemetSubmitButton.reset();

  closePopupAddElement();
}

//Смена кнопки Лайк
function likeToggle(event) {
  event.target.classList.toggle('element__like-button_active');
}

//Удаление Блока
function deleteElement(event) {
  event.target.closest('.element').remove();
}

function openPopupShowImage(event) {
  showImage.src = event.target.src;
  showImage.alt = event.target.alt;
  showImageName.textContent = event.target.parentElement.querySelector('.element__name').textContent;

  openPopup(popupShowImage);
}

function closePopupShowImage() {
  closePopup(popupShowImage);
};

showElements();

//Слушатели для Редактирования Профиля
profileEditButton.addEventListener('click', openPopupProfileEdit);
popupEditProfileCloseButton.addEventListener('click', closePopupProfileEdit);
popupEditProfileSubmitButton.addEventListener('submit', changeProfile);

//Слушатели для добавления карточки
addElementButton.addEventListener('click', openPopupAddElement);
popupAddElementCloseButton.addEventListener('click', closePopupAddElement);
popupAddElemetSubmitButton.addEventListener('submit', addNewElement);

//Слушатель закрытия popup Картинки
popupShowImageCloseButton.addEventListener('click', closePopupShowImage);