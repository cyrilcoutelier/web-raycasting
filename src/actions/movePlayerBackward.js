import * as angleUtils from '../angleUtils';
import movePlayer from './movePlayer';

export default function movePlayerBackward(player, world, distance) {
  const angle = angleUtils.normalizeAngle(player.horizontalAngle + Math.PI);
  movePlayer(player, world, distance, angle);
}
