import Popup from "./Popup"

export default class PopupWarning extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._submitButton = this._popup.querySelector('.popup__submit');
    }

    setConfirmHandle(callback) {
        this._confirmHandle = callback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', () => { this._confirmHandle() })
    }
}