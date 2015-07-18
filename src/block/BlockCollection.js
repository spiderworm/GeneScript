
export default class BlockCollection {

  constructor() {
    this._blocks = {};
  }

  subscribe(callback) {
    Object.observe(this._blocks, function(changes) {
      changes.forEach(function(change) {
        callback(change.object[change.name]);
      });
    }, ["add"]);
    for (var id in this._blocks) {
      callback(this._blocks[id]);
    }
  }

  add(block) {
    if (this._blocks[block.id]) {
      throw new Error('block with that ID already in the collection');
    }
    this._blocks[block.id] = block;
  }

  contains(id) {
    return this.get(id) ? true : false;
  }

  get(id) {
    return this._blocks[id];
  }

}
