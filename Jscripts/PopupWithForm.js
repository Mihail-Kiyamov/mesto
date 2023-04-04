import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._form = this._popup.querySelector('.popup__submit-form');
    }

    _getInputValues() {
        const inputValueList = {};
        this._inputList.forEach( (item) => {
            inputValueList[item.name] = item.value;
        });
        return inputValueList;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues());
            this.Close();
        });
    }

    Close() {
        super.Close();

        this._form.reset();
    }
}