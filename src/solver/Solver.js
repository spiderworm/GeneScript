
import Rand from 'es6!../util/Rand';

export default class Solver {

  constructor(seed, options) {
    this._seed = seed;
    this._rng = new Rand(this._seed);
    this._options = options || {};
  }

}
