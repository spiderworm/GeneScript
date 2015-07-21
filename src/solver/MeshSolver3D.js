
import Solver from 'es6!./Solver';
import primitiveUtil from 'es6!../util/primitiveUtil';
import Node3D from 'es6!../node/Node3D';

export default class MeshSolver3D extends Solver {

  constructor(seed, mask, options) {
    super(seed, mask, options);
    this._nodeDistance = primitiveUtil.getNumber(options.nodeDistance, 1);
    this._nodeScatter = primitiveUtil.getNumber(options.nodeScatter, 0);
    this._nodes = {};
  }

  _getNode(x, y, z) {
    if (this._nodes[x] === undefined) {
      this._nodes[x] = {};
    }
    if (this._nodes[x][y] === undefined) {
      this._nodes[x][y] = {};
    }
    if (this._nodes[x][y][z] === undefined) {
      var scatterMax = this._nodeDistance * this._nodeScatter;

      var ax = x * this._nodeDistance + (2 * scatterMax * this._rng(x+','+y+','+z) - scatterMax),
          ay = y * this._nodeDistance + (2 * scatterMax * this._rng(y+','+z+','+x) - scatterMax),
          az = z * this._nodeDistance + (2 * scatterMax * this._rng(z+','+x+','+y) - scatterMax);

      var value;
      if (this._mask) {
        value = this._mask.solver.renderPoint(ax,ay,az);
      } else {
        value = 1;
      }
      if(!this._mask || value >= this._mask.strength) {
        this._nodes[x][y][z] = new Node3D(ax,ay,az,value);
      } else {
        this._nodes[x][y][z] = false;
      }
    }
    return this._nodes[x][y][z];
  }

}
