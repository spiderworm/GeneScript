
import Registry from 'es6!./Registry';

export default class GeneScriptAPI {

  constructor(interpreter) {
    this._registry = new Registry();
  }

  get registry() { return this._registry; }

  decorate(target) {
    target.addConfig = this._addConfig.bind(this);
  }

  _addConfig(raw) {
    this._registry.extend(raw);
  }

}
