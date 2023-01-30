let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let newName = document.querySelector('.popup__input_type_name');
let newAbout = document.querySelector('.popup__input_type_about');
let popup = document.querySelector('.popup');

function openPopup() {
    popup.classList.add('popup_opened');
    newName.value = profileName.textContent;
    newAbout.value = profileAbout.textContent;
};

function closePopup() {
    popup.classList.remove('popup_opened');
};

function changeProfile(event) {
    event.preventDefault();
    profileName.textContent = newName.value;
    profileAbout.textContent = newAbout.value;
    closePopup();
};

document.querySelector('.popup__submit-form').addEventListener('submit', changeProfile);

document.querySelector('.profile__edit-button').addEventListener('click', openPopup);

document.querySelector('.popup__close').addEventListener('click', closePopup);