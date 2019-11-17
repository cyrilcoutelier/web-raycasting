import * as angleUtils from './angleUtils';
import * as vectorUtils from './vectorUtils';
import castRayToWall from './rayCasting/castRayToWall';
import castRayToObject from './rayCasting/castRayToObject';
import * as TileType from './TileType';

const CAMERA_ANGLE = angleUtils.degreesToRadians(60);
const NB_RAYS = 1024;
const WORLD_SCREEN_HEIGHT = 1.5;
const WALL_HEIGHT = 1;

const PIXEL_SHUTTLE = [0, 0, 0, 0];

export default class ImageRenderer {
  constructor({
    screen,
    world,
    player,
    textures,
    nbRays = NB_RAYS,
    cameraAngle = CAMERA_ANGLE,
    worldScreenHeight = WORLD_SCREEN_HEIGHT,
  }) {
    this.nbRays = nbRays;
    this.cameraAngle = cameraAngle;
    this.worldScreenHeight = worldScreenHeight;
    this.textures = textures;

    this.screen = screen;
    this.world = world;
    this.player = player;

    this.worldScreenWidth = screen.getWidth() * this.worldScreenHeight / screen.getHeight();
    this.distanceToScreen = (this.worldScreenWidth / 2) / Math.tan(this.cameraAngle / 2);
  }

  renderImage() {
    this.screen.clear();
    this.screen.loadImageData();

    this.getObjectsInFieldOfView();
    const leftAngle = angleUtils.normalizeAngle(this.player.getHorizontalAngle() + (this.cameraAngle / 2));
    const angleBetweenRays = this.cameraAngle / this.nbRays;

    for (let rayIdx = 0; rayIdx < this.nbRays; rayIdx++) {
      let rayAngle = leftAngle - angleBetweenRays * rayIdx;
      rayAngle = angleUtils.normalizeAngle(rayAngle);
      this.renderRay(rayIdx, rayAngle);
    }
    this.screen.putImageData();
  }

  getObjectsInFieldOfView() {
    const cameraLeftAngle = angleUtils.normalizeAngle(this.player.getHorizontalAngle() + (this.cameraAngle / 2));
    const cameraRightAngle = angleUtils.normalizeAngle(this.player.getHorizontalAngle() - (this.cameraAngle / 2));

    this.objects = [];
    this.world.items.forEach((item) => {
      const diffVec = vectorUtils.getDiff(this.player, item);
      const distance = vectorUtils.getNorm(diffVec);
      const angle = vectorUtils.getAngle(diffVec);
      const tangent = (item.width / 2) / distance;
      const halfWidthAngle = Math.atan(tangent);
      const itemLeftAngle = angleUtils.normalizeAngle(angle + halfWidthAngle);
      const itemRightAngle = angleUtils.normalizeAngle(angle - halfWidthAngle);
      if (angleUtils.isBetween(cameraLeftAngle, cameraRightAngle, itemLeftAngle) ||
        angleUtils.isBetween(cameraLeftAngle, cameraRightAngle, itemRightAngle)) {
        this.objects.push(item);
      }
    });
  }

  renderRay(rayIdx, rayAngle) {
    let impacts = [];
    const wallImpact = castRayToWall(this.world, this.player.x, this.player.y, rayAngle);
    impacts.push(wallImpact);
    this.objects.forEach((object) => {
      const objectImpact = castRayToObject(object, this.player.x, this.player.y, rayAngle);
      impacts.push(objectImpact);
    });
    impacts = impacts.filter(isNotNull);
    impacts.sort(compareDistance);
    impacts = getImpactsBeforeOpaqueWall(impacts);
    impacts.reverse();

    impacts.forEach((impact) => {
      this.displayImpact(impact, rayIdx);
    });
  }

  displayImpact(impact, rayIdx) {
    const screenX = rayIdx * this.screen.getWidth() / this.nbRays;

    const textureName = this.getTextureName(impact);
    const texture = this.textures.get(textureName);
    const targetWidth = impact.targetWidth;
    const targetX = impact.targetX;
    const textureX = targetX * texture.getWidth() / targetWidth;

    const screenWidth = this.screen.getWidth() / this.nbRays;

    const objectHeightProjectedOnScreen = this.distanceToScreen / impact.distance * WALL_HEIGHT;
    const objectScreenHeight = objectHeightProjectedOnScreen * this.screen.getHeight() / this.worldScreenHeight;
    const objectTopScreenY = Math.floor(this.screen.getHeight() / 2 - objectScreenHeight / 2);
    const objectBottomScreenY = Math.floor(objectTopScreenY + objectScreenHeight);
    for (let screenY = objectTopScreenY; screenY < objectBottomScreenY; screenY++) {
      const relativeY = screenY - objectTopScreenY;
      const textureY = relativeY * texture.getHeight() / objectScreenHeight;
      texture.getPixelData(textureX, textureY, PIXEL_SHUTTLE);
      this.screen.writeRect(screenX, screenY, screenWidth, 1, PIXEL_SHUTTLE);
    }
  }

  getTextureName(impact) {
    if (impact.target.type === TileType.WALL) {
      return 'cyril_poster_v1.jpg';
    } else {
      return impact.target.texture;
    }
  }
}

function isNotNull(entity) {
  return entity !== null;
}

function compareDistance(left, right) {
  return left.distance - right.distance;
}

function getImpactsBeforeOpaqueWall(impacts) {
  const idx = impacts.findIndex(isOpaqueWall);
  if (idx < 0) {
    return impacts;
  }
  return impacts.slice(0, idx + 1);
}

function isOpaqueWall(impact) {
  return impact.target.type === TileType.WALL;
}

