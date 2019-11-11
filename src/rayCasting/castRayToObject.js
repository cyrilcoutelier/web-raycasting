import * as vectorUtils from '../vectorUtils';
import * as angleUtils from '../angleUtils';

export default function castRayToObject(object, x, y, rayAngle) {
  const cameraPos = { x, y };
  const diffVec = vectorUtils.getDiff(cameraPos, object);
  const tangentVec = {
    x: -diffVec.y,
    y: diffVec.x,
  };
  const distanceToObject = vectorUtils.getNorm(diffVec);
  const angle = vectorUtils.getAngle(diffVec);
  const tangent = (object.width / 2) / distanceToObject;
  const halfWidthAngle = Math.atan(tangent);
  const itemLeftAngle = angleUtils.normalizeAngle(angle + halfWidthAngle);
  const itemRightAngle = angleUtils.normalizeAngle(angle - halfWidthAngle);

  if (!angleUtils.isBetween(itemLeftAngle, itemRightAngle, rayAngle)) {
    return null;
  }

  const rayVec = angleUtils.getVec(rayAngle);
  const impactCoordinate = vectorUtils.getLinesIntersection(object, tangentVec, cameraPos, rayVec);
  const targetX = computeTargetX(object, impactCoordinate, diffVec);
  if (impactCoordinate === null) {
    throw new Error('The ray and the object should cross');
  }
  const distanceToImpact = vectorUtils.getNorm(vectorUtils.getDiff(cameraPos, impactCoordinate));

  const impact = {
    distance: distanceToImpact,
    x: impactCoordinate.x,
    y: impactCoordinate.y,
    targetWidth: object.width,
    targetX,
    target: object,
  };

  return impact;
}

function computeTargetX(object, impact, cameraToObjectVec) {
  let angle = vectorUtils.getAngle(cameraToObjectVec);
  angle += Math.PI / 2;
  angle = angleUtils.normalizeAngle(angle);
  let centerToEdgeVec = angleUtils.getVec(angle);
  centerToEdgeVec = vectorUtils.applyNorm(centerToEdgeVec, object.width / 2);
  let leftEdgePos = vectorUtils.add(object, centerToEdgeVec);
  let edgeImpactDistance = vectorUtils.getDiff(leftEdgePos, impact);
  let targetX = vectorUtils.getNorm(edgeImpactDistance);
  return targetX;
}