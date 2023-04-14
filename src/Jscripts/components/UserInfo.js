export default class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
            id: this._id
        }
    }

    setUserInfo(name, about, id) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._id = id;
    }
}