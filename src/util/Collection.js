
export default class Collection {

  constructor(items) {
    this._items = {};
    for (var id in items) {
      this.add(id, items[id]);
    }
  }

  add(id, item) {
    if (this._items[id]) {
      throw new Error(
        (this.constructor.name || Collection.name) +
        ': duplicate id ' + id
      );
    }
    this._items[id] = item;
  }

  get(id) {
    return this._items[id];
  }

  forEach(callback) {
    for(var id in this._items) {
      callback(id,this._items[id]);
    }
  }

}
