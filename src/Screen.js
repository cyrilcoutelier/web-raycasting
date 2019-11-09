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
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = CLEAR_COLOR;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawRect(x, y, width, height, color) {
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  drawImageData(x, y, width, height, pixelShuttle) {
    x = Math.floor(x);
    y = Math.floor(y);
    const alpha = pixelShuttle[3] / 255;
    const rgb = `rgb(${pixelShuttle[0]}, ${pixelShuttle[1]}, ${pixelShuttle[2]})`;
    this.ctx.globalAlpha = alpha;
    this.ctx.fillStyle = rgb;
    this.ctx.fillRect(x, y, width, height);
  }
}
