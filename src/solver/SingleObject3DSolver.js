
import Node3D from 'es6!../node/Node3D';
import Solver from 'es6!./Solver';

export default class SingleObject3DSolver extends Solver {
  
  constructor(x,y,z,value) {
    super();
    this._node = new Node3D(x,y,z,value);
  }

  getNodesInArea(x,y,z,w,h,d) {
    var results = [];
    if (
      x <= this._node.x &&
      y <= this._node.y &&
      z <= this._node.z &&
      x + w > this._node.x &&
      y + h > this._node.y &&
      z + d > this._node.z
    ) {
      results.push(this._node);
    }
    return results;
  }

}