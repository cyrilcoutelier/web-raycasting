import * as angleUtils from '../angleUtils';
import calcHorizontalImpact from '../rayCasting/calcHorizontalImpact';
import calcVerticalImpact from '../rayCasting/calcVerticalImpact';

const MIN_DISTANCE_TO_WALL = 0.05;

export default function movePlayer(player, world, distance, angle) {
  const horizontalImpact = calcHorizontalImpact(
    world, 
    player.x,
    player.y,
    angle,
  );
  if (horizontalImpact && horizontalImpact.distance < distance) {
    const coeff = angleUtils.getHorizontalCoeff(angle);
    player.x = horizontalImpact.x - (coeff * MIN_DISTANCE_TO_WALL);
  } else {
    const xMove = distance * Math.cos(angle);
    player.x += xMove;
  }

  const verticalImpact = calcVerticalImpact(
    world, 
    player.x,
    player.y,
    angle,
  );
  if (verticalImpact && verticalImpact.distance < distance) {
    const coeff = angleUtils.getVerticalCoeff(angle);
    player.y = verticalImpact.y - (coeff * MIN_DISTANCE_TO_WALL);
  } else {
    const yMove = distance * Math.sin(angle);
    player.y += yMove;
  }
}
