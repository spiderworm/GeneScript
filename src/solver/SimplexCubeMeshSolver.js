
import Solver from 'es6!./Solver';
import SimplexSolver from 'es6!./Simplex3DSolver';
import Node from 'es6!../node/Node3D';
import primitiveUtil from 'es6!../util/primitiveUtil';

export default class SimplexCubeMeshSolver extends Solver {

  constructor(seed, options) {
    super(seed, options);
    this._nodeDistance = primitiveUtil.getNumber(options.node.distance, 1);
    this._nodeScatter = primitiveUtil.getNumber(options.node.scatter, 0);
    this._maskStrength = primitiveUtil.getNumber(options.mask.strength, .5);
    this._nodes = {};
    this._mask = new SimplexSolver(seed, options.mask);
  }

  getNodesInArea(areaX, areaY, areaZ, areaW, areaH, areaD) {
    var results = [];

    var ax = Math.ceil((areaX / this._nodeDistance) - 2),
        ay = Math.ceil((areaY / this._nodeDistance) - 2),
        az = Math.ceil((areaZ / this._nodeDistance) - 2);

    var bx = Math.floor(((areaX + areaW) / this._nodeDistance) + 2),
        by = Math.floor(((areaY + areaH) / this._nodeDistance) + 2),
        bz = Math.floor(((areaZ + areaD) / this._nodeDistance) + 2);

    for (var x = ax; x < bx; x++) {
      for (var y = ay; y < by; y++) {
        for (var z = az; z < bz; z++) {
          var node = this._getNode(x,y,z);
          if (node &&
              node.x >= areaX && node.y >= areaY && node.z >= areaZ &&
              node.x < areaX + areaW && node.y < areaY + areaH && node.z < areaZ + areaD
          ) {
            results.push(node);
          }
        }
      }
    }

    return results;
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

      var value = this._mask.get(ax,ay,az);
      if (value >= this._maskStrength) {
        this._nodes[x][y][z] = new Node(ax,ay,az,value);
      } else {
        this._nodes[x][y][z] = false;
      }
    }
    return this._nodes[x][y][z];
  }

}

