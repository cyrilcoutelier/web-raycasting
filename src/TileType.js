export const WALL = 'wall';
export const FLOOR = 'floor';

export function fromRaw(raw) {
  if (raw === 'w') {
    return WALL;
  } else {
    return FLOOR;
  }
}
