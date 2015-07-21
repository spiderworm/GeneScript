
import Registry from 'es6!./Registry';
import extend from 'es6!../util/extend';
import ConfigInterpreter from 'es6!./ConfigInterpreter';

export default class GeneScriptAPI {

  constructor(registry,interpreter) {
    this._registry = registry || new Registry();
  }

  get registry() { return this._registry; }

  decorate(target) {
    target.addConfig = this._addConfig.bind(this);
  }

  cloneRegistry() {
    return Registry.clone(this._registry);
  }

  createInterpreter() {
    var registry = this.cloneRegistry();
    var interpreter = new ConfigInterpreter(registry);
    return interpreter;
  }

  _addConfig(raw) {
    this._registry.extend(raw);
  }

}
