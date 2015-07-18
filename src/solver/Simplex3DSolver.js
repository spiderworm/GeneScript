
import Noise from 'es6!../../lib/Noise';
import Solver from 'es6!./Solver';

export default class Simplex3DSolver extends Solver {

  constructor(seed, options) {
    super(seed, options);
    this._scale = options.scale || 10;
    this._noise = new Noise();
    this._noise.seed(this._seed);
  }

  get(x, y, z) {
    return (
      this._noise.simplex3(
        x / this._scale,
        y / this._scale,
        z / this._scale
      ) + 1
    ) / 2;
  }

}
