import './pages/index.css';

import {config, initialCards} from './Jscripts/constants.js';
import {FormValidator} from './Jscripts/components/FormValidator.js';
import Card from './Jscripts/components/Card';
import {Section} from './Jscripts/components/Section.js';
import PopupWithImage from './Jscripts/components/PopupWithImage.js';
import PopupWithForm from './Jscripts/components/PopupWithForm.js';
import UserInfo from './Jscripts/components/UserInfo.js';

const newName = document.querySelector('.popup__input_type_name');
const newAbout = document.querySelector('.popup__input_type_about');
const profileEditButton = document.querySelector('.profile__edit-button');
const addElementButton = document.querySelector('.profile__add-button');
const popupEditProfileSubmitForm = document.querySelector('.popup__submit-form_type_edit-profile');
const popupAddElemetSubmitForm = document.querySelector('.popup__submit-form_type_add-element');


const profile = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about'});

const cardContainer = new Section({items: initialCards, renderer: item => {
  const newCard = new Card(item.name, item.link, '#element-template', (src, name) => {
    popupShowImage.open(src, name);
  });
  
  const cardElement = newCard.generateCard();

  cardContainer.addItem(cardElement);
} }, '.elements')

const popupShowImage = new PopupWithImage('.popup_type_show-image');
popupShowImage.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', (Inputs) => {
  profile.setUserInfo(Inputs.name,  Inputs.about);
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_add-element', (Inputs) => {
  const cardElement = new Card(Inputs.mestoName, Inputs.mestoSrc, '#element-template', (Inputs) => {
    popupShowImage.open(Inputs.mestoSrc, Inputs.mestoName);
  }).generateCard();

  cardContainer.addItem(cardElement);
});
popupAddCard.setEventListeners();


//Открытие попапа Изменение Данных Профиля
function openPopupProfileEdit() {
  popupEditProfile.open();
  newName.value = profile.getUserInfo().name;
  newAbout.value = profile.getUserInfo().about;

  profileEditFormValidator.resetErrors();
  profileEditFormValidator.enableButton();
};

//Открытие попапа Новой Карточки
function openPopupAddElement() {
  popupAddCard.open();

  addCardFormValidator.resetErrors();
  addCardFormValidator.disableButton();
};

cardContainer.renderItems();

//Создание валидации
const profileEditFormValidator = new FormValidator(config, popupEditProfileSubmitForm);
profileEditFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, popupAddElemetSubmitForm);
addCardFormValidator.enableValidation();

//Слушатели для Редактирования Профиля
profileEditButton.addEventListener('click', openPopupProfileEdit);


//Слушатели для добавления карточки
addElementButton.addEventListener('click', openPopupAddElement);