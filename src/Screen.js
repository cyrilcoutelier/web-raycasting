const CLEAR_COLOR = 'black';

export default class Screen {

  constructor({
    ctx,
    width,
    height,
  }) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  clear() {
    this.ctx.fillStyle = CLEAR_COLOR;
    this.ctx.fillRect(0, 0, this.width, this.height);  
  }

  drawRect(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);  
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

}
