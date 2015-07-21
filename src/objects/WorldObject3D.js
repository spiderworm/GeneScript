
import GeneObject3D from 'es6!./GeneObject3D';

export default class WorldObject3D extends GeneObject3D {
  
  constructor(profile,node,vals) {
    super(profile);
    this._node = node;
    this.x = vals.x || 0;
    this.y = vals.y || 0;
    this.z = vals.z || 0;
    this.size = vals.size || 1;
    this.scale = vals.scale || 1;
    this.objects = {};
    this.shape = vals.shape;
    this.color = vals.color;
    this.range = vals.range;
  }

}
