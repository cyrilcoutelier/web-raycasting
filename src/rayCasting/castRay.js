import calcHorizontalImpact from './calcHorizontalImpact';
import calcVerticalImpact from './calcVerticalImpact';

export default function castRay(world, x, y, angle) {
  const horizontalImpact = calcHorizontalImpact(world, x, y, angle);
  const verticalImpact = calcVerticalImpact(world, x, y, angle);
  if (horizontalImpact === null && verticalImpact === null) {
    return null;
  }
  if (verticalImpact !== null &&
    (horizontalImpact === null ||
      horizontalImpact.distance > verticalImpact.distance)) {
    return verticalImpact;
  } else {
    return horizontalImpact;
  }
}
