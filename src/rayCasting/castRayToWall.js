import calcHorizontalImpact from './calcHorizontalImpact';
import calcVerticalImpact from './calcVerticalImpact';

const WALL_WIDTH = 1;

export default function castRayToWall(world, x, y, angle) {
  const horizontalImpact = calcHorizontalImpact(world, x, y, angle);
  const verticalImpact = calcVerticalImpact(world, x, y, angle);
  if (horizontalImpact === null && verticalImpact === null) {
    return null;
  }
  if (verticalImpact !== null &&
    (horizontalImpact === null ||
      horizontalImpact.distance > verticalImpact.distance)) {
    fillRelativeX(verticalImpact);
    return verticalImpact;
  } else {
    fillRelativeX(horizontalImpact);
    return horizontalImpact;
  }
}

function fillRelativeX(impact) {
  impact.targetWidth = WALL_WIDTH;
  if (impact.x === impact.target.x) {
    impact.targetX = 1 - (impact.y - impact.target.y);
  } else if (impact.x - 1 === impact.target.x) {
    impact.targetX = (impact.y - impact.target.y);
  } else if (impact.y === impact.target.y) {
    impact.targetX = (impact.x - impact.target.x);
  } else if (impact.y - 1 === impact.target.y) {
    impact.targetX = 1 - (impact.x - impact.target.x);
  } else {
    throw new Error('Invalid wall impact');
  }
}
