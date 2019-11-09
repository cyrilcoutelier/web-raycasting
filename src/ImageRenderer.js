import * as angleUtils from './angleUtils';
import * as vectorUtils from './vectorUtils';
import castRayToWall from './rayCasting/castRayToWall';
import castRayToObject from './rayCasting/castRayToObject';
import * as TileType from './TileType';

const CAMERA_ANGLE = angleUtils.degreesToRadians(60);
const NB_RAYS = 1024;
const WORLD_SCREEN_HEIGHT = 1.5;


export default class ImageRenderer {
  constructor({
    screen,
    world,
    player,
    nbRays = NB_RAYS,
    cameraAngle = CAMERA_ANGLE,
    worldScreenHeight = WORLD_SCREEN_HEIGHT,
  }) {
    this.nbRays = nbRays;
    this.cameraAngle = cameraAngle;
    this.worldScreenHeight = worldScreenHeight;

    this.screen = screen;
    this.world = world;
    this.player = player;

    this.worldScreenWidth = screen.getWidth() * this.worldScreenHeight / screen.getHeight();
    this.distanceToScreen = (this.worldScreenWidth / 2) / Math.tan(this.cameraAngle / 2);
  }

  renderImage() {
    this.screen.clear();

    this.getObjectsInFieldOfView();
    const leftAngle = angleUtils.normalizeAngle(this.player.getHorizontalAngle() + (this.cameraAngle / 2));
    const angleBetweenRays = this.cameraAngle / this.nbRays;

    for (let rayIdx = 0; rayIdx < this.nbRays; rayIdx++) {
      let rayAngle = leftAngle - angleBetweenRays * rayIdx;
      rayAngle = angleUtils.normalizeAngle(rayAngle);
      this.renderRay(rayIdx, rayAngle);
    }
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
    const width = this.screen.getWidth() / this.nbRays;

    const wallHeightProjectedOnScreen = this.distanceToScreen / impact.distance * this.worldScreenHeight;
    const height = wallHeightProjectedOnScreen * this.screen.getHeight() / this.worldScreenHeight;
    const screenY = this.screen.getHeight() / 2 - height / 2;

    const color = getColor(impact);

    this.screen.drawRect(screenX, screenY, width, height, color);
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

function getColor(impact) {
  if (impact.target.type === TileType.WALL) {
    return getWallColor(impact);
  } else {
    return 'orange';
  }
}

function getWallColor(impact) {
  if (impact.x === impact.target.x) {
    return 'blue';
  } else if (impact.x - 1 === impact.target.x) {
    return 'yellow';
  } else if (impact.y === impact.target.y) {
    return 'red';
  } else if (impact.y - 1 === impact.target.y) {
    return 'green';
  } else {
    return 'grey';
  }
}
