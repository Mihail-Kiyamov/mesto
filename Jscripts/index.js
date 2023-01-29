document.querySelector('.profile__edit-button').addEventListener('click', function () {
    document.querySelector('.popup').classList.add('popup_opened');
});

document.querySelector('.popup__close').addEventListener('click', function () {
    document.querySelector('.popup').classList.remove('popup_opened');
});

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
document.querySelector('.popup__name').value = profileName.textContent;
document.querySelector('.popup__about').value = profileAbout.textContent;

function changeProfile() {
    profileName.textContent = document.querySelector('.popup__name').value;
    profileAbout.textContent = document.querySelector('.popup__about').value;

    document.querySelector('.popup').classList.remove('popup_opened');
}

document.querySelector('.popup__submit').addEventListener('click', changeProfile);