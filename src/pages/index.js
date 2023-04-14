import '../pages/index.css';

import {config} from '../Jscripts/constants.js';
import {FormValidator} from '../Jscripts/components/FormValidator.js';
import Card from '../Jscripts/components/Card';
import {Section} from '../Jscripts/components/Section.js';
import PopupWithImage from '../Jscripts/components/PopupWithImage.js';
import PopupWithForm from '../Jscripts/components/PopupWithForm.js';
import UserInfo from '../Jscripts/components/UserInfo.js';
import Api from '../Jscripts/components/Api.js';
import PopupWarning from '../Jscripts/components/PopupWarning';

const newName = document.querySelector('.popup__input_type_name');
const newAbout = document.querySelector('.popup__input_type_about');
const profileEditButton = document.querySelector('.profile__edit-button');
const addElementButton = document.querySelector('.profile__add-button');
const changeAvatarButton = document.querySelector('.profile__circle-for-image');
const popupEditProfileSubmitForm = document.querySelector('.popup__submit-form_type_edit-profile');
const popupAddElemetSubmitForm = document.querySelector('.popup__submit-form_type_add-element');
const popupChangeAvatarSubmitForm = document.querySelector('.popup_type_change-avatar');
const popupEditProfileSubmitButton = popupEditProfileSubmitForm.querySelector('.popup__submit');
const popupAddElementSubmitButton = popupAddElemetSubmitForm.querySelector('.popup__submit');
const popupChangeAvatarSubmitButton = popupChangeAvatarSubmitForm.querySelector('.popup__submit');
const profileAvatar = document.querySelector('.profile__avatar');

const profile = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about'});

const api = new Api('65395c33-5b1a-4f62-9796-f7da5822a9af');

api.getProfileInfo()
  .then((result) => {
    profile.setUserInfo(result.name, result.about, result._id);
    profileAvatar.src = result.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

const cardContainer = new Section({renderer: item => {
  const newCard = generateCardElement(item.name, item.link, item._id, item.likes.length, item.owner._id);

  cardContainer.addItem(newCard);
} }, '.elements')

api.getInitialCards()
.then((result) => {
  cardContainer.renderItems(result)
})
.catch((err) => console.log(err))

function generateCardElement(name, src, id, likeCounter, ownerId) {
  const cardElement = new Card(name, src, id, likeCounter, '#element-template', (src, name) => {
    popupShowImage.open(src, name);
  }, (card) => {
    popupWarning.setConfirmHandle(() => {
      api.deleteCard(card._id)
      .then(() => {
        card.deleteElement();
        popupWarning.close();
      })
      .catch((err) => console.log(err))
    });
    popupWarning.open()
  }, (card) => {
    api.putLike(card._id)
    .then((result) => {
      card.setLikeValue(result.likes.length);
    })
    .catch((err) => console.log(err))
  }, (card)  => {
    api.deleteLike(card._id)
    .then((result) => {
      card.setLikeValue(result.likes.length);
    })
    .catch((err) => console.log(err))
  }).generateCard(profile.getUserInfo().id == ownerId);

  return cardElement;
}

const popupShowImage = new PopupWithImage('.popup_type_show-image');
popupShowImage.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', (inputs) => {
  popupEditProfileSubmitButton.value = 'Сохранение...';
  api.changeProfile(inputs)
  .then((result) => {
    profile.setUserInfo(result.name,  result.about)
  })
  .catch((err) => console.log(err));
  popupEditProfileSubmitButton.value = 'Сохранить';
})
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_add-element', (inputs) => {
  popupAddElementSubmitButton.value = 'Создание...';
  api.addNewCard(inputs)
  .then(result => {
    cardContainer.addItemPrepend(generateCardElement(result.name, result.link, result._id, result.likes.length, profile.getUserInfo().id))
  })
  .catch((err) => console.log(err));
  popupAddElementSubmitButton.value = 'Создать';
});
popupAddCard.setEventListeners();

const popupChangeAvatar = new PopupWithForm('.popup_type_change-avatar', (values) => {
  popupChangeAvatarSubmitButton.value = 'Сохранение...';
  api.changeAvatar(values.avatarSrc)
  .then(() => {
    profileAvatar.src = values.avatarSrc;
  })
  .catch((err) => console.log(err));
  popupChangeAvatarSubmitButton.value = 'Сохраненить';
});
popupChangeAvatar.setEventListeners();

const popupWarning = new PopupWarning('.popup_type_warning');
popupWarning.setEventListeners();

//Открытие попапа Изменение Данных Профиля
function openPopupProfileEdit() {
  popupEditProfile.open();
  const userInfo = profile.getUserInfo();
  newName.value = userInfo.name;
  newAbout.value = userInfo.about;

  profileEditFormValidator.resetErrors();
  profileEditFormValidator.enableButton();
};

//Открытие попапа Новой Карточки
function openPopupAddElement() {
  popupAddCard.open();

  addCardFormValidator.resetErrors();
  addCardFormValidator.disableButton();
};

//Открытие попапа Изменния Аватара
function openPopupChangeAvatar() {
  popupChangeAvatar.open();

  changeAvatarFormValidator.resetErrors();
  changeAvatarFormValidator.disableButton();
}

//Создание валидации
const profileEditFormValidator = new FormValidator(config, popupEditProfileSubmitForm);
profileEditFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(config, popupAddElemetSubmitForm);
addCardFormValidator.enableValidation();
const changeAvatarFormValidator = new FormValidator(config, popupChangeAvatarSubmitForm);
changeAvatarFormValidator.enableValidation();

//Слушатели для Редактирования Профиля
profileEditButton.addEventListener('click', openPopupProfileEdit);


//Слушатели для добавления карточки
addElementButton.addEventListener('click', openPopupAddElement);

//Слушатель изменения аватара
changeAvatarButton.addEventListener('click', openPopupChangeAvatar);