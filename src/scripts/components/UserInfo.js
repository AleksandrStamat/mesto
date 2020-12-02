export default class UserInfo {
  constructor({ profileNameSelector, profileHobbySelector }) {
    this._profileNameSelector = document.querySelector(profileNameSelector);
    this._profileHobbySelector = document.querySelector(profileHobbySelector);
  }

  getUserInfo() {
    const profileValue = {};
    profileValue.name = this._profileNameSelector.textContent;
    profileValue.hobby = this._profileHobbySelector.textContent;
    return profileValue;
  }

  setUserInfo(object) {
    this._profileNameSelector.textContent = object.name;
    this._profileHobbySelector.textContent = object.hobby;
  }
}
