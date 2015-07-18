
import GeneObject3D from './GeneObject3D';

export default class WorldObject3D extends GeneObject3D {
  
  constructor(profile,node,x,y,z) {
    super(profile);
    this._node = node;
    this._x = x;
    this._y = y;
    this._z = z;
    this._negRange = -profile.range;
    this._doubleRange = 2 * profile.range;
    this._profiles = profile.profiles;
  }

  render(detail,oX,oY,oZ,oScale) {
    var render = {
      x: this._x,
      y: this._y,
      z: this._z,
      size: this._profile.size * this._profile.scale * oScale,
      detail: detail,
      shape: this._profile.shape,
      color: this._profile.color,
      objects: {}
    };
    for(var name in this._profile.profiles) {
      render.objects[name] = WorldObject3D.renderProfileObjects(
        this._profile.profiles[name],
        this._profile.negRange,
        this._profile.negRange,
        this._profile.negRange,
        this._profile.doubleRange,
        this._profile.doubleRange,
        this._profile.doubleRange,
        detail,
        this._x * oScale,
        this._y * oScale,
        this._z * oScale,
        this._profile.scale * oScale
      );
    }
    return render;
  }

  static createFromProfile(profile,x,y,z,w,h,d,oX,oY,oZ,oScale) {
    var results = [];
    var nodes = profile.distribution(x,y,z,w,h,d);
    nodes.forEach(function(node) {

      var obj = new WorldObject3D(
        profile,
        node,
        node.x * oScale + oX,
        node.y * oScale + oY,
        node.z * oScale + oZ
      );

      results.push(obj);

    });
    return results;
  }

  static renderProfileObjects(profile,x,y,z,w,h,d,detail,oX,oY,oZ,oScale) {
    var totalScale = oScale * profile.scale;
    var objects = this.createFromProfile(profile,x,y,z,w,h,d,oX,oY,oZ,oScale);
    var results = objects.map(function(worldObject3D) {
      return worldObject3D.render(detail,oX,oY,oZ,oScale,totalScale);
    });
    return results;
  }

}
