
import MeshSolver3D from 'es6!./MeshSolver3D';

export default class SquareMeshSolver3D extends MeshSolver3D {

  render(areaX, areaY, areaZ, areaW, areaH, areaD) {
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

}
