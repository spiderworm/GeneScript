
import Simplex2DSolver from 'es6!./Simplex2DSolver';
import Node from 'es6!../node/Node2D';

export default class SimplexSquareMeshSolver {

  constructor(nodeDistance, density) {
    this._nodeDistance = nodeDistance;
    density = density || .5;
    this._negativeMask = 1 - density; 
    this._nodes = {};
    this.simplex = new Simplex2DSolver();
  }

  getNodesInArea(areaX, areaY, areaW, areaH) {
    var results = [];

    var ax = Math.ceil((areaX / this._nodeDistance) - 2),
        ay = Math.ceil((areaY / this._nodeDistance) - 2);

    var bx = Math.floor(((areaX + areaW) / this._nodeDistance) + 2),
        by = Math.floor(((areaY + areaH) / this._nodeDistance) + 2);

    for (var x = ax; x < bx; x++) {
      for (var y = ay; y < by; y++) {
        var node = this._getNode(x,y);
        if (node &&
            node.x >= areaX && node.y >= areaY &&
            node.x < areaX + areaW && node.y < areaY + areaH
        ) {
          results.push(node);
        }
      }
    }

    return results;
  }

  _getNode(x, y) {
    if (this._nodes[x] === undefined) {
      this._nodes[x] = {};
    }
    if (this._nodes[x][y] === undefined) {
      var ax = x * this._nodeDistance,
          ay = y * this._nodeDistance;

      var value = this.simplex.get(ax,ay);
      if (value >= this._negativeMask) {
        this._nodes[x][y] = new Node(ax,ay);
        this._nodes[x][y].value = value;
      } else {
        this._nodes[x][y] = false;
      }
    }
    return this._nodes[x][y];
  }

}

