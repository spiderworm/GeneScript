
import extend from 'es6!../util/extend';

export default class Registry {
  
  constructor(vals) {
    this._vals = {
      profiles: {},
      distributions: {},
      shapes: {
        Sphere: {}
      }
    };
    this.extend(vals);
  }

  extend(vals) {
    extend(this._vals,vals);
  }

  get seed() { return this._vals.seed; }

  get profiles() { return this._vals.profiles; }

  get distributions() { return this._vals.distributions; }

  get shapes() { return this._vals.shapes; }

  get config() { return this._vals; }

  static clone(registry) {
    var vals = extend({},registry.config);
    registry = new Registry(vals);
    return registry;
  }

}