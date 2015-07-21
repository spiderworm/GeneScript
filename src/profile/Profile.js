
import extend from 'es6!../util/extend';
import Rand from 'es6!../util/Rand';

export default class Profile {

  constructor(api,seed,config) {
    this._api = api;
    this._seed = seed;
    this._config = config;
    this._rand = new Rand(seed);
  }

  render() {
    throw new Error('must be defined in subclass');
  }

}