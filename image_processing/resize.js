const Jimp = require('jimp')

async function createTexture(n) {  
  const image = await Jimp.read(`raw/${n.toString()}.png`);

  await image.crop(0, (image.getHeight() / 2) - 60, image.getWidth(), 120);
  await image.resize(1024, 60);
  
  await image.write(`final/${n.toString()}.png`);
}

async function main() {
  const nums = [];
  for (let i = 0; i < 100; ++i) {
    nums.push(i);
  }
  await Promise.all(nums.map(n => createTexture(n)));
}

main();
