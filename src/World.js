import * as TileType from './TileType';
import * as angleUtils from './angleUtils';

export default class World {

  constructor(map) {
    this.height = map.data.length;
    this.width = map.data[0].length;
    this.data = map.data;
    this.spawnPosition = map.spawnPosition;
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  getSpawnPosition() {
    return this.spawnPosition;
  }

  getWallSize() {
    return 1;
  }

  getHeight() {
    return this.height;
  }

  getWidth() {
    return this.width;
  }

  isYInside(y) {
    return y > 0 && y < this.height;
  }

  isXInside(x) {
    return x > 0 && x < this.width;
  }

  getTileHorizontal(x, y, angle) {
    const tileY = Math.floor(y);
    let tileX = Math.round(x);
    if (!angleUtils.isHorizontalPositif(angle)) {
      tileX--;
    }
    const tile = this.getTile(tileX, tileY);
    return tile;
  }

  getTileVertical(x, y, angle) {
    const tileX = Math.floor(x);
    let tileY = Math.round(y);
    if (!angleUtils.isVerticalPositif(angle)) {
      tileY--;
    }
    const tile = this.getTile(tileX, tileY);
    return tile;
  }

  getTile(x, y) {
    if (x < 0 || x >= this.width) {
      throw new Error(`The tile x ${x} is incorrect`);
    }
    if (y < 0 || y >= this.height) {
      throw new Error(`The tile x ${x} is incorrect`);
    }
    const rawTile = this.data[(this.height - 1) - y][x];
    const type = TileType.fromRaw(rawTile);
    const tile = {
      type,
      x,
      y,
    };
    return tile;
  }

}
