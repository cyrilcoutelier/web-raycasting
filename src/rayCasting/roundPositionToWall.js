export default function roundPositionToWall(value, isPositif) {
  if (isPositif) {
    return Math.ceil(value);
  } else {
    return Math.floor(value);
  }
}
