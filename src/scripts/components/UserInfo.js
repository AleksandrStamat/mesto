export default class UserInfo {
  constructor({
    profileNameSelector,
    profileHobbySelector,
    profileAvatarSelector,
  }) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileHobbyElement = document.querySelector(profileHobbySelector);
    this._profileAvatarElement = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    const profileValue = {};
    profileValue.name = this._profileNameElement.textContent;
    profileValue.about = this._profileHobbyElement.textContent;
    return profileValue;
  }
  getUserAvatar() {
    return this._profileAvatarElement.src;
  }
  setUserInfo({ name, about, avatar }) {
    this._profileNameElement.textContent = name;
    this._profileHobbyElement.textContent = about;
    this._profileAvatarElement.src = avatar;
  }
}
