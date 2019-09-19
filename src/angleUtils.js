export function getVerticalCoeff(angle) {
  if (isVerticalPositif(angle)) {
    return 1;
  } else {
    return -1;
  }
}

export function isVerticalPositif(angle) {
  return angle >= 0 && angle < Math.PI;
}

export function getHorizontalCoeff(angle) {
  if (isHorizontalPositif(angle)) {
    return 1;
  } else {
    return -1;
  }
}
export function isHorizontalPositif(angle) {
  return angle <= Math.PI / 2 || angle > Math.PI * 1.5;
}

export function degreesToRadians(angle) {
  return angle * Math.PI / 180;
}

export function radiansToDegrees(angle) {
  return angle * 180 / Math.PI;
}

export function isVertical(angle) {
  return angle === 0.5 * Math.PI || angle === 1.5 * Math.PI;
}

export function isHorizontal(angle) {
  return angle === 0 || angle === Math.PI;
}

export function normalizeAngle(angle) {
  if (angle >= 2 * Math.PI) {
    return angle % (2 * Math.PI);
  } else if (angle < 0) {
    angle = angle % (2 * Math.PI);
    if (angle < 0) {
      angle += 2 * Math.PI;
    }
    return angle;
  } else {
    return angle;
  }
}
