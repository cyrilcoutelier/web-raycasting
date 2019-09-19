import * as angleUtils from '../angleUtils';
import movePlayer from './movePlayer';

export default function straffPlayerLeft(player, world, distance) {
  const angle = angleUtils.normalizeAngle(player.horizontalAngle + Math.PI / 2);
  movePlayer(player, world, distance, angle);
}
