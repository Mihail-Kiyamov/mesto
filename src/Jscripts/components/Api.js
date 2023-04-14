export default class Api {
    constructor(token) {
        this.token = token;
    }

    getProfileInfo() {
        return fetch('https://nomoreparties.co/v1/cohort-63/users/me', {
            method: 'GET',
            headers: {
                authorization: this.token
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-63/cards', {
            method: 'GET',
            headers: {
                authorization: this.token
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    changeProfile(inputs) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-63/users/me', {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputs.name,
                about: inputs.about
            })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    addNewCard(inputs) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-63/cards', {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputs.mestoName,
                link: inputs.mestoSrc
            })
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-63/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    putLike(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-63/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this.token
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteLike(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-63/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this.token
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}