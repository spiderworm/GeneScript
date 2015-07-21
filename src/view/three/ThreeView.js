
import ThrottledQueue from '../../util/ThrottledQueue';

export default class ThreeView {
  
  constructor(THREE, traveller, scale) {
    this._THREE = THREE;
    this._traveller = traveller;
    this._scale = scale;
    this._scene = new THREE.Scene();

    var queue = new ThrottledQueue(
      [],
      function(three) {
        this._scene.add(three);
      }.bind(this),
      .2
    );
    queue.autoStop = false;
    queue.autoStart = true;

    this._traveller.onBlockInRange(function(block) {
      var three = new ThreeThing(THREE, block, 0, 0, 0, scale);
      queue.add(three);
    }.bind(this));
  }

  get scene() {
    return this._scene;
  }

  setPosition(x,y,z) {
    var scale = this._scale;
    this._traveller.setPosition(
      x / scale,
      y / scale,
      z / scale
    );
  }

  enableBlockWireframes() {
    if(!this._blockWireframes) {
      this._blockWireframes = true;
      var scale = this._scale;
      this._traveller.onBlockInRange(function(block) {
        this.drawWireframe(
          block.x,
          block.y,
          block.z,
          1,
          1,
          1,
          0x555555
        );
      }.bind(this));
    }
  }

  drawWireframe(x,y,z,w,h,d,color) {
    var scale = this._scale;
    var wireframe = new THREE.Mesh(
      new THREE.BoxGeometry(
        w*scale,
        h*scale,
        d*scale
      ),
      new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true
      })
    );
    wireframe.position.set(
      x*scale,
      y*scale,
      z*scale
    );
    this._scene.add(wireframe);
    return wireframe;
  }

}




function ThreeThing(THREE, obj, px, py, pz, scale) {

  var three;
  if (obj.shape) {
    var shape = new THREE.SphereGeometry(scale * obj.size / 2, 12, 8);
    var material = new THREE.MeshBasicMaterial({ color: obj.color, wireframe: true });
    three = new THREE.Mesh(shape, material);
    three.sphere = true;
  } else {
    three = new THREE.Object3D();
  }

  three.position.set(
    (obj.x - px) * scale,
    (obj.y - py) * scale,
    (obj.z - pz) * scale
  );

  for(var name in obj.objects) {
    for(var i=0; i<obj.objects[name].length; i++) {
      var child = new ThreeThing(
        THREE,
        obj.objects[name][i],
        obj.x,
        obj.y,
        obj.z,
        scale
      );
      three.add(child);
      if(child.sphere) three.sphere = true;
    }
  }
  return three;
}
