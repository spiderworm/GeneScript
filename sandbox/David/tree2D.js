
import SimplexSquareMeshSolver from 'es6!../src/solvers/SimplexSquareMeshSolver';
import CanvasPainter from 'es6!../src/util/CanvasPainter';

export default class Demo {

  constructor(canvas, blockSize, nodeDistance, nodeDensity) {
    this._painter = new CanvasPainter(canvas);
    this._solver = new SimplexSquareMeshSolver(nodeDistance, nodeDensity);
    this._simplex = this._solver.simplex;
    this._blockSize = blockSize;

    var height = Math.ceil(canvas.height / blockSize);
    var width = Math.ceil(canvas.width / blockSize);
    for (var x = 0; x <= width; x++) {
      for (var y = 0; y <= height; y++) {
        this.renderBlock(x,y);
      }
    }
  }

  renderBlock(x, y) {
    var blockSize = this._blockSize;

    var x1 = x * this._blockSize,
        y1 = y * this._blockSize;
    var x2 = x1 + this._blockSize - 1,
        y2 = y1 + this._blockSize - 1;

    for (var x3 = x1; x3 <= x2; x3++) {
      for (var y3 = y1; y3 <= y2; y3++) {
        var value = this._simplex.get(x3 / blockSize, y3 / blockSize);
        var color = Math.floor(value * 256);
        this._painter.paintPixel(
          x3, y3,
          color, color, color, 255
        );
      }
    }

    var nodes = this._solver.getNodesInArea(x,y,1,1);

    nodes.forEach(function(node) {
      this._painter.paintRect(
        node.x * blockSize - 2,
        node.y * blockSize - 2,
        5, 5,
        255, 0, 0, 255
      );
    }.bind(this));

  }

}
