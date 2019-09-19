import { normalizeAngle } from '../angleUtils';

export default function turnPlayerLeft(player, angle) {
  player.horizontalAngle += angle;
  player.horizontalAngle = normalizeAngle(player.horizontalAngle);
}
