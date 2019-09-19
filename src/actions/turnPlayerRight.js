import { normalizeAngle } from '../angleUtils';

export default function turnPlayerRight(player, angle) {
  player.horizontalAngle -= angle;
  player.horizontalAngle = normalizeAngle(player.horizontalAngle);
}
