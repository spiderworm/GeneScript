
import extend from 'es6!../util/extend';

export default class ConfigInterpreter {

  constructor(registry) {
    this._registry = registry;
  }

  get registry() { return this._registry; }

  getSolverProfileConfig(raw, args) {
    var config = this._getConfigObject(raw, args, this._registry.solvers);
    return config;
  }

  getDistributionConfig(raw, args) {
    var config = this._getConfigObject(raw, args, this._registry.distributions);
    if (raw.solver) {
      config.solver = this._getConfigObject(config.solver, args, this._registry.solvers);
    }
    return config;
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
