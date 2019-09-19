import movePlayer from './movePlayer';

export default function movePlayerForward(player, world, distance) {
  const angle = player.horizontalAngle;
  movePlayer(player, world, distance, angle);
}
