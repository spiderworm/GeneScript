
import extend from 'es6!../util/extend';

export default class Registry {
  
  constructor() {
    this._vals = {
      profiles: {},
      distributions: {}
    };
  }

  extend(vals) {
    extend(this._vals,vals);
  }

  get seed() { return this._vals.seed; }

  get profiles() { return this._vals.profiles; }

  get distributions() { return this._vals.distributions; }

  get config() { return this._vals; }

}