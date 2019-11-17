const CLEAR_COLOR = 'black';

const ALPHA = 3;
const RGB_SIZE = 3;
const PIXEL_SIZE = 4;

export default class Screen {

  constructor({
    ctx,
    width,
    height,
  }) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.imageData = null;
  }

  clear() {
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = CLEAR_COLOR;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  loadImageData() {
    this.imageData = this.ctx.getImageData(0, 0, this.width, this.height);
  }

  writeRect(x, y, width, height, pixelData) {
    width = Math.floor(width);
    height = Math.floor(height);
    x = Math.floor(x);
    y = Math.floor(y);
    if (pixelData[ALPHA] === 0) {
      return;
    }
    for (let dx = 0; dx < width; dx++) {
      for (let dy = 0; dy < height; dy++) {
        this.writePixel(x + dx, y + dy, pixelData);
      }
    }
  }

  writePixel(x, y, pixelData) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return;
    }
    const alpha = pixelData[ALPHA];
    if (alpha === 0) {
      return;
    } else if (alpha === 255) {
      const imageIdx = x * PIXEL_SIZE + y * PIXEL_SIZE * this.width;
      for (let pixelIdx = 0; pixelIdx < RGB_SIZE; pixelIdx++) {
        this.imageData.data[imageIdx + pixelIdx] = pixelData[pixelIdx];
      }
    } else {
      const imageIdx = x * PIXEL_SIZE + y * PIXEL_SIZE * this.width;
      for (let pixelIdx = 0; pixelIdx < RGB_SIZE; pixelIdx++) {
        const oldColor = this.imageData.data[imageIdx + pixelIdx];
        const newColor = pixelData[pixelIdx];
        const alpha = this.imageData.data[imageIdx + ALPHA];
        const avgColor = Math.round((newColor * alpha + oldColor * (255-alpha)) / 255);
        this.imageData.data[imageIdx + pixelIdx] = avgColor;
      }
    }
  }

  putImageData() {
    this.ctx.putImageData(this.imageData, 0, 0);
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
