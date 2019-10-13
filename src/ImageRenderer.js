import * as angleUtils from './angleUtils';
import castRayToWall from './rayCasting/castRayToWallToWall';

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

    const leftAngle = angleUtils.normalizeAngle(this.player.getHorizontalAngle() + (this.cameraAngle / 2));
    const angleBetweenRays = this.cameraAngle / this.nbRays;

    for (let rayIdx = 0; rayIdx < this.nbRays; rayIdx++) {
      let rayAngle = leftAngle - angleBetweenRays * rayIdx;
      rayAngle = angleUtils.normalizeAngle(rayAngle);
      this.renderRay(rayIdx, rayAngle);
    }
  }

  renderRay(rayIdx, rayAngle) {
    const impact = castRayToWall(this.world, this.player.x, this.player.y, rayAngle);
    if (impact === null) {
      return;
    }

    const x = rayIdx * this.screen.getWidth() / this.nbRays;
    const width = this.screen.getWidth() / this.nbRays;

    const wallHeightProjectedOnScreen = this.distanceToScreen / impact.distance * this.worldScreenHeight;
    const height = wallHeightProjectedOnScreen * this.screen.getHeight() / this.worldScreenHeight;
    const y = this.screen.getHeight() / 2 - height / 2;

    const color = getColor(impact);

    this.screen.drawRect(x, y, width, height, color);
  }

}

function getColor(impact) {
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
