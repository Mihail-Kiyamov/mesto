import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._showImageName = this._popup.querySelector('.popup__image-name');
        this._showImage = this._popup.querySelector('.popup__image');
    }

    Open(src, name) {
        this._showImage.src = src;
        this._showImage.alt = name;
        this._showImageName.textContent = name;

        super.Open();
    }
}