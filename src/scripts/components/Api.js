export default class Api {
  constructor({ token, baseUrl, groupId }) {
    this._token = token;
    this._url = baseUrl;
    this._groupId = groupId;
  }
  _erorrCheck(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCardgs() {
    return fetch(`${this._url}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._erorrCheck);
  }
  getProfile() {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._erorrCheck);
  }
  getAllNeededData() {
    return Promise.all([this.getProfile(), this.getInitialCards()]);
  }
  changeProfile(data) {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._erorrCheck);
  }

  changeAvatar(data) {
    return fetch(`${this._url}/${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._erorrCheck);
  }
  addCard({ name, link }) {
    return fetch(`${this._url}/${this._groupId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._erorrCheck);
  }
  deleteCard(id) {
    return fetch(`${this._url}/${this._groupId}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._erorrCheck);
  }
  toggleLike(id, status) {
    return fetch(`${this._url}/${this._groupId}/cards/likes/${id}`, {
      method: status ? "DELETE" : "PUT",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._erorrCheck);
  }
}
