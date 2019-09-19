import * as angleUtils from '../angleUtils';
import * as TileType from '../TileType';
import roundPositionToWall from './roundPositionToWall';

export default function calcVerticalImpact(world, sourceX, sourceY, angle) {
  if (angleUtils.isHorizontal(angle)) {
    return null;
  }

  const isVerticalPositif = angleUtils.isVerticalPositif(angle);
  const firstWallY = roundPositionToWall(sourceY, isVerticalPositif);
  const firstWallX = getWallXFromY(sourceY, sourceX, firstWallY, angle);
  if (!world.isXInside(firstWallX) || !world.isYInside(firstWallY)) {
    return null;
  }

  const wallSize = world.getWallSize();
  const yDistanceBetweenWalls = wallSize * angleUtils.getVerticalCoeff(angle);
  const xDistanceBetweenWalls = getYFromX(yDistanceBetweenWalls, angle);
  let wallX = firstWallX;
  let wallY = firstWallY;

  do {
    const tile = world.getTileVertical(wallX, wallY, angle);
    if (tile.type === TileType.WALL) {
      const distance = Math.sqrt(Math.pow(wallX - sourceX, 2) + Math.pow(wallY - sourceY, 2));
      const impact = {
        x: wallX,
        y: wallY,
        angle,
        target: tile,
        distance,
      };
      return impact;
    }

    wallX += xDistanceBetweenWalls;
    wallY += yDistanceBetweenWalls;
  } while (world.isYInside(wallY) && world.isYInside(wallX));
  return null;
}

export function getWallXFromY(sourceY, sourceX, firstWallY, angle) {
  const distanceYToWall = firstWallY - sourceY;
  const distanceXToWall = getYFromX(distanceYToWall, angle);
  const wallX = distanceXToWall + sourceX;
  return wallX;
}

export function getYFromX(y, angle) {
  return y / Math.tan(angle);
}
