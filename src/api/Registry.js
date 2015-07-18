
import extend from 'es6!../util/extend';

export default class Registry {
  
  constructor() {
    this._vals = {};
    this._profiles = {};
  }

  extend(vals) {
    extend(this._vals,vals);
  }

  getSeed() {
    return this._vals.seed;
  }

  get seed() { return this.getSeed(); }

  getProfileConfig(config, args) {
    var result = {};
    while (typeof config !== "object") {
      if (typeof config === "function") {
        args = args || [];
        config = config.apply({},args);
      } else if (typeof config === "string") {
        if(this._vals.profiles && this._vals.profiles[config]) {
          config = this.getProfileConfig(this._vals.profiles[config]);
        } else {
          config = {};
        }
      } else {
        throw new Error('config parse error');
      }
    }
    if (config.base) {
      var subConfig = resolve(config.base);
      extend(result,subConfig);
    }
    extend(result,config);
    delete result.base;
    if (result.distribution) {
      result.distribution = this.getDistributionConfig(result.distribution, args);
    }
    return result;
  }

  getDistributionConfig(config, args) {
    var result = {};
    while (typeof config !== "object") {
      if (typeof config === "function") {
        args = args || [];
        config = config.apply({},args);
      } else if (typeof config === "string") {
        if(this._vals.distributions && this._vals.distributions[config]) {
          config = this.getDistributionConfig(this._vals.distributions[config]);
        } else {
          config = {};
        }
      } else {
        throw new Error('config parse error');
      }
    }
    if (config.base) {
      var subConfig = resolve(config.base);
      extend(result,subConfig);
    }
    extend(result,config);
    delete result.base;
    return result;
  }

}