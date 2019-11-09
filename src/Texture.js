const PIXEL_ARRAY_SIZE = 4;

export default class Texture {
  constructor({
    imageBitmap,
    name,
    ctx,
  }) {
    this.imageBitmap = imageBitmap,
    this.name = name;
    this.ctx = ctx;
    this.imageData = this.ctx.getImageData(0, 0, this.imageBitmap.width, this.imageBitmap.height);
  }

  getWidth() {
    return this.imageBitmap.width;
  }

  getHeight() {
    return this.imageBitmap.height;
  }

  getPixelData(x, y, pixelShuttle) {
    x = Math.floor(x);
    y = Math.floor(y);
    const dataStart = x * PIXEL_ARRAY_SIZE + y * this.getWidth() * PIXEL_ARRAY_SIZE;
    for (let pixelIdx = 0; pixelIdx < PIXEL_ARRAY_SIZE; pixelIdx++) {
      const val = this.imageData.data[dataStart + pixelIdx];
      pixelShuttle[pixelIdx] = val;
    }
  }
}
