
import Block3D from 'es6!../block/Block3D';
import Block3DCollection from 'es6!../block/Block3DCollection';
import WorldObject3D from 'es6!./WorldObject3D';
import GeneObject3D from 'es6!./GeneObject3D';

export default class World3D extends GeneObject3D {

  constructor (profile) {
    super(profile);
    this._blocks = new Block3DCollection();
  }

  get blocks() { return this._blocks; }
  set blocks(ignore) {}

  getBlockAt(x,y,z) {
    var block = this._blocks.getByPosition(x,y,z);
    if (!block) {
      block = this._createBlock(x,y,z,1);
      this._blocks.add(block);
    }
    return block;
  }

  _createBlock(x, y, z, detail) {
    var block = new Block3D(x,y,z);
    block.objects.root = WorldObject3D.renderProfileObjects(
      this._profile,
      block.x-.5,
      block.y-.5,
      block.z-.5,
      1,
      1,
      1,
      detail,
      0,
      0,
      0,
      1
    );
    return block;
  }

}