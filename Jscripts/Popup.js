export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__close');
    }

    Open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    Close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.code === 'Escape') {
            this.Close();
        }
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', () => { this.Close() });
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.Close();
            }
        });
    }
}