export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  addItemBegin(item) {
    this._container.prepend(item);
  }
  addItemEnd(item) {
    this._container.append(item);
  }
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
