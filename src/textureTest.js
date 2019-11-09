


const IMG_SRC = 'assets/textures/wall.svg';

export default async function textureTest() {
  const image = new Image();
  image.src = IMG_SRC;
  await hasImageLoaded(image);
  const imageBitmap = await createImageBitmap(image);
  const canvas = document.createElement('canvas');
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imageBitmap, 0, 0, imageBitmap.width, imageBitmap.height);
  const pixelData = ctx.getImageData(3, 3, 4, 4);
  console.log(pixelData);
}

function hasImageLoaded(image) {
  return new Promise((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = reject;
  });
}