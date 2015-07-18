
import Noise from 'es6!../../lib/Noise';

export default class Simplex2DSolver {

  constructor(options) {
    this._noise = new Noise();
    this.config(options);
  }

  config(options) {
    options = options || {};
    this._scale = options.scale || this._scale || 10;
    this._noise.seed(options.seed || this._seed || 1);
  }

  get(x, y) {
    return (
      this._noise.simplex2(
        x / this._scale,
        y / this._scale
      ) + 1
    ) / 2;
  }

}
