
import Rand from 'es6!../util/Rand';

export default class Solver {

  constructor(seed, mask, options) {
    this._seed = seed;
    this._mask = mask;
    this._rng = new Rand(this._seed);
    this._options = options || {};
  }

  render(areaX, areaY, areaZ, areaW, areaH, areaD) {
    throw new Error('must be implemented by subclass');
  }

}
