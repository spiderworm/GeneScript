
export default class Block3D {

  constructor(x,y,z) {
    x = Math.round(x);
    y = Math.round(y);
    z = Math.round(z);
    this.x = x;
    this.y = y;
    this.z = z;
    this.id = Block3D.createID(x,y,z);
    this.objects = {};
  }

  static createID(x,y,z) {
    x = Math.round(x);
    y = Math.round(y);
    z = Math.round(z);
    return [x,y,z].join(',');
  }

}
