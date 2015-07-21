
import Node3D from 'es6!../node/Node3D';
import MeshSolver3D from 'es6!./MeshSolver3D';

export default class SingleObjectSolver3D extends MeshSolver3D {
  
  constructor(mask,options) {
    super(null,mask,options);
    this._node = new Node3D(
      options.x,
      options.y,
      options.z,
      options.value
    );
  }

  render(x,y,z,w,h,d) {
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