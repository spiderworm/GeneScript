
import Registry from 'es6!./Registry';
import extend from 'es6!../util/extend';

export default class GeneScriptAPI {

  constructor(interpreter) {
    this._registry = new Registry();
  }

  get registry() { return this._registry; }

  decorate(target) {
    target.addConfig = this._addConfig.bind(this);
  }

  getDistributionConfig(raw, args) {
    return this._getConfigObject(raw, args, this._registry.distributions);
  }

  getObjectProfileConfig(raw, args) {
    var config = this._getConfigObject(raw, args, this._registry.profiles);

    var position = config.position;
    if (typeof position !== "function") {
      position = function() {
        return {
          x: config.x,
          y: config.y,
          z: config.z
        };
      }
    };
    /*
    delete config.x;
    delete config.y;
    delete config.z;
    */
    config.position = position;

    if(config.shape) {
      config.shape = this._getConfigObject(config.shape,args,this._registry.shapes);
    }

    return config;
  }

  getWorldConfig(raw, args) {
    return extend({},raw);
  }

  getProfilesCollectionConfig(raw, args) {
    return this._getConfigObject(raw, args, null);
  }

  _addConfig(raw) {
    this._registry.extend(raw);
  }

  _getConfigObject(config, args, globals) {
    while (typeof config !== "object") {
      if (typeof config === "string") {
        if (!globals) {
          throw new Error('not supported');
        }
        config = globals[config] || {};
      } else if (typeof config === "function") {
        config = config.apply({},args);
      } else if (typeof config === "undefined") {
        config = {};
      } else {
        throw new Error('config cannot be parsed');
      }
    }
    var result = {};
    if (config.base) {
      var baseConfig = this._getConfigObject(config.base, args, globals);
      extend(result,baseConfig);
    }
    extend(result,config);
    delete result.base;
    return result;
  }

}
