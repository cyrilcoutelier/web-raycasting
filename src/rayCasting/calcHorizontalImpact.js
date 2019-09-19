import * as angleUtils from '../angleUtils';
import * as TileType from '../TileType';
import roundPositionToWall from './roundPositionToWall';

export default function calcHorizontalImpact(world, sourceX, sourceY, angle) {
  if (angleUtils.isVertical(angle)) {
    return null;
  }

  const isHorizontalPositif = angleUtils.isHorizontalPositif(angle);
  const firstWallX = roundPositionToWall(sourceX, isHorizontalPositif);
  const firstWallY = getWallYFromX(sourceX, sourceY, firstWallX, angle);
  if (!world.isYInside(firstWallY) || !world.isXInside(firstWallX)) {
    return null;
  }

  const wallSize = world.getWallSize();
  const xDistanceBetweenWalls = wallSize * angleUtils.getHorizontalCoeff(angle);
  const yDistanceBetweenWalls = getXFromY(xDistanceBetweenWalls, angle);
  let wallX = firstWallX;
  let wallY = firstWallY;

  do {
    const tile = world.getTileHorizontal(wallX, wallY, angle);
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

export function getWallYFromX(sourceX, sourceY, wallX, angle) {
  const distanceXToWall = wallX - sourceX;
  const distanceYToWall = getXFromY(distanceXToWall, angle);
  const wallY = distanceYToWall + sourceY;
  return wallY;
}

export function getXFromY(x, angle) {
  return Math.tan(angle) * x;
}
