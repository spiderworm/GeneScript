
export default class CanvasPainter {

  constructor(canvas) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
  }

  paintPixel(x,y,r,g,b,a) {
    this.paintRect(x,y,1,1,r,g,b,a);
  }

  paintRect(x,y,w,h,r,g,b,a) {
    this._context.fillStyle = "rgba(" + [r,g,b,a].join(",") + ")";
    this._context.fillRect(x,y,w,h);
  }

}
