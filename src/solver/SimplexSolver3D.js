
import Noise from 'es6!../../lib/Noise';
import Solver from 'es6!./Solver';

export default class SimplexSolver3D extends Solver {

  constructor(seed, mask, options) {
    super(seed, mask, options);
    this._scale = options.scale || 10;
    this._noise = new Noise();
    this._noise.seed(this._seed);
  }

  render(x, y, z, w, h, d) {
    var results = [];
    for(var x1=x; x1<x+w; x1++) {
      if (!results[x1]) {
        results[x1] = [];
      }
      for(var y1=y; y1<y+h; y1++) {
        if (!results[x1][y1]) {
          results[x1][y1] = [];
        }
        for(var z1=z; z1<z+d; z1++) {
          results[x1][y1][z1] = this.renderPoint(x1,y1,z1);
        }
      }
    }
    return results;
  }

  renderPoint(x, y, z) {
    return (
      this._noise.simplex3(
        x / this._scale,
        y / this._scale,
        z / this._scale
      ) + 1
    ) / 2;
  }

}
