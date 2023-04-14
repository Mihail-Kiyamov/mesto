export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector}) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
            id: this._id,
            avatarSrc: this._avatarSrc
        }
    }

    setUserInfo(name, about, id, avatarSrc) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._id = id;
        this._avatarSrc = avatarSrc;
        this.changeAvatar(avatarSrc);
    }

    changeAvatar(src) {
        this._avatar.src = src;
    }
}