export function getAngle(vec) {
  const normalizedVec = normalize(vec);
  let angle = Math.acos(normalizedVec.x);
  if (normalizedVec.y < 0) {
    angle = Math.PI * 2 - angle;
  }
  return angle;
}

/**
 * Do not use on null vector (produce NaN)
 */
export function normalize(vec) {
  const norm = getNorm(vec);
  if (norm === 0) {
    throw new Error('Cannot normalize a null vector.');
  }
  return {
    x: vec.x / norm,
    y: vec.y / norm,
  };
}

export function getNorm(vec) {
  return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
}

export function getDiff(from, to) {
  return {
    x: to.x - from.x,
    y: to.y - from.y,
  };
}

/**
 * {@link http://jsfiddle.net/justin_c_rounds/Gd2S2/light/}
 */
export function getLinesIntersection(leftPos, leftVec, rightPos, rightVec) {
  const denominator = ((rightVec.y) * (leftVec.x)) - ((rightVec.x) * (leftVec.y));
  if (denominator == 0) {
    return null;
  }
  let a = leftPos.y - rightPos.y;
  let b = leftPos.x - rightPos.x;
  const numerator1 = ((rightVec.x) * a) - ((rightVec.y) * b);
  a = numerator1 / denominator;

  const result = {};
  result.x = leftPos.x + (a * (leftVec.x));
  result.y = leftPos.y + (a * (leftVec.y));
  return result;
}
