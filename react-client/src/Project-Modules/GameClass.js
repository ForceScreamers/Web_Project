export default class Game {
  constructor(id, path, component, jsonData, previewImage) {
    this.Id = id;
    this.path = path;
    this.component = component;
    this.jsonData = jsonData;
    this.previewImage = previewImage;
  }
}