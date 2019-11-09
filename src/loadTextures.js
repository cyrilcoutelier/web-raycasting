import Texture from './Texture';

const PREFIX = 'assets/textures/';

export default async function loadTextures(texturesNames) {
  const texturesMap = new Map();
  const promises = texturesNames.map(loadTexture, texturesMap);
  await Promise.all(promises);
  return texturesMap;
}

async function loadTexture(textureName) {
  const image = new Image();
  const loadPromise = hasImageLoaded(image);
  image.src = PREFIX + textureName;
  await loadPromise;
  const imageBitmap = await createImageBitmap(image);
  const canvas = document.createElement('canvas');
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imageBitmap, 0, 0, imageBitmap.width, imageBitmap.height);

  const texture = new Texture({
    imageBitmap,
    ctx,
    name: textureName,
  });

  const texturesMap = this;
  texturesMap.set(textureName, texture);
}

function hasImageLoaded(image) {
  return new Promise((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = reject;
  });
}
