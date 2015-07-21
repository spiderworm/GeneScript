
import BlockCollection from 'es6!../block/BlockCollection';
import ThrottledQueue from 'es6!../util/ThrottledQueue';


function Traveller3D(world, range) {
  this._world = world;
  this._range = range || 0;
  this._blocks = new BlockCollection();
  this._queue = new ThrottledQueue(
    [],
    this._processBlock.bind(this),
    .1
  );
  this._queue.autoStart = true;
  this._queue.autoStop = false;
  this.setPosition(0,0,0);
}
Traveller3D.prototype.setPosition = function(x,y,z) {
  if (!isNaN(x) && !isNaN(y) && !isNaN(x)) {
    var block = this._world.getBlockAt(x,y,z);
    if (block !== this._currentBlock) {
      this._currentBlock = block;
      var range = Math.round(this._range);
      var ax = block.x - range,
          ay = block.y - range,
          az = block.z - range;
      var bx = block.x + range,
          by = block.y + range,
          bz = block.z + range;
      this._queue.empty();
      for (var x = ax; x <= bx; x++) {
        for (var y = ay; y <= by; y++) {
          for (var z = az; z <= bz; z++) {
            this._queue.add({x: x, y: y, z: z});
          }
        }
      }
    }
  }
}

Traveller3D.prototype.renderBlock = function(x,y,z) {
  this._queue.addFirst({x: x, y: y, z: z});
}

Traveller3D.prototype.onBlockInRange = function(callback) {
  this._blocks.subscribe(callback);
}

Traveller3D.prototype.onBlockOutOfRange = function(callback) {}

Traveller3D.prototype._processBlock = function(position) {
  var block = this._world.getBlockAt(position.x,position.y,position.z);
  if (!this._blocks.contains(block.id)) {
    var dist = Math.max(
      Math.abs(this._currentBlock.x - block.x),
      Math.abs(this._currentBlock.y - block.y),
      Math.abs(this._currentBlock.z - block.z)
    );
    if (dist <= this._range) {
      this._blocks.add(block);
    }
  }
}

export default Traveller3D;
