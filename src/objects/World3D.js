
import Block3DCollection from 'es6!../block/Block3DCollection';
import GeneObject3D from 'es6!./GeneObject3D';
import Traveller3D from 'es6!../traveller/Traveller3D';

export default class World3D extends GeneObject3D {

  constructor (worldProfile) {
    super(worldProfile);
    this._blocks = new Block3DCollection();
  }

  get blocks() { return this._blocks; }
  set blocks(ignore) {}

  getBlockAt(x,y,z) {
    var block = this._blocks.getByPosition(x,y,z);
    if (!block) {
      var start = +new Date();
      block = this._profile.renderBlock(x,y,z,1);
      this._blocks.add(block);
      var stop = +new Date();
    }
    return block;
  }

  createTraveller(range) {
    return new Traveller3D(this,range);
  }

}