import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._form = this._popup.querySelector('.popup__submit-form');
        this._submitButton = this._form.querySelector('.popup__submit');
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
            const initialText = this._submitButton.value;
            this._submitButton.value = 'Сохранение...';

            this._handleSubmitForm(this._getInputValues())
            .then(() => this.close())
            .finally(() => {
                this._submitButton.value = initialText;
            });
        });
    }

    close() {
        super.close();

        this._form.reset();
    }
}