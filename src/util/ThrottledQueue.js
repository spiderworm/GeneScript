
function ThrottledQueue(queue, callback, seconds) {
  queue = queue || [];
  this._queue = queue.concat([]);
  this._callback = callback;
  this._ms = (seconds || 1) * 1000;
  this.autoStop = true;
  this.autoStart = true;
  this.repeat = 0;
  this.start();
}
ThrottledQueue.prototype.add = function(val) {
  this.addAt(val,this._queue.length);
}
ThrottledQueue.prototype.addFirst = function(val) {
  this.addAt(val,0);
}
ThrottledQueue.prototype.addAt = function(val, i) {
  this._queue.splice(i,1,val);
  if(!this.isRunning() && this.autoStart) {
    this.start();
  }
}
ThrottledQueue.prototype.empty = function() {
  this._queue = [];
}
ThrottledQueue.prototype.runNext = function() {
  for(var i=0; i<this.repeat+1; i++) {
    if (this._queue.length) {
      var next = this._queue.shift();
      this._callback(next);
      if (!this._queue.length && this.autoStop) {
        this.stop();
      }
    } else {
      break;
    }
  }
}
ThrottledQueue.prototype.isRunning = function() {
  return this._interval ? true : false;
}
ThrottledQueue.prototype.stop = function() {
  if (this.isRunning()) {
    clearInterval(this._interval);
    this._interval = null;
  }
}
ThrottledQueue.prototype.start = function() {
  if (!this.isRunning()) {
    this._interval = setInterval(this.runNext.bind(this), this._ms);
  }
}

export default ThrottledQueue;
