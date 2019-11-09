import Screen from './Screen';
import map from './maps/houses';
import Player from './Player';
import World from './World';
import straffPlayerLeft from './actions/straffPlayerLeft';
import straffPlayerRight from './actions/straffPlayerRight';
import turnPlayerRight from './actions/turnPlayerRight';
import movePlayerForward from './actions/movePlayerForward';
import movePlayerBackward from './actions/movePlayerBackward';
import ImageRenderer from './ImageRenderer';
import loadTextures from './loadTextures';

const DISTANCE = 0.1;
const ANGLE = Math.PI / 64;

const SCREEN_WIDTH = 1024;
const SCREEN_HEIGHT = 768;

const TEXTURES_NAMES = [
  'wall2.jpg',
  'gymnast.png',
  'cyril_poster_v1.jpg',
];

main();

//
// start here
//
async function main() {
  const textures = await loadTextures(TEXTURES_NAMES);

  const canvasElem = document.querySelector('#glCanvas');
  const ctx = canvasElem.getContext('2d');
  // Only continue if Context is available and working
  if (ctx === null) {
    alert('Unable to initialize Canvas. Your browser or machine may not support it.');
    return;
  }
  const screen = new Screen({
    ctx,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });

  const world = new World(map);

  world.addItem({
    x: 2,
    y: 2,
    width: 0.5,
    texture: 'gymnast.png',
  });
  world.addItem({
    x: 5,
    y: 2,
    width: 0.5,
    texture: 'gymnast.png',
  });

  const player = new Player(world.getSpawnPosition());
  const renderer = new ImageRenderer({
    screen,
    world,
    player,
    textures,
  });

  renderer.renderImage();

  document.addEventListener('mousemove', (event) => {
    const angle = event.movementX * ANGLE;
    turnPlayerRight(player, angle);
    renderer.renderImage();
  });

  document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key === 'ArrowLeft') {
      straffPlayerLeft(player, world, DISTANCE);
    }
    if (key === 'ArrowRight') {
      straffPlayerRight(player, world, DISTANCE);
    }
    if (key === 'ArrowUp') {
      movePlayerForward(player, world, DISTANCE);
    }
    if (key === 'ArrowDown') {
      movePlayerBackward(player, world, DISTANCE);
    }
    renderer.renderImage();
  }, false);
}
