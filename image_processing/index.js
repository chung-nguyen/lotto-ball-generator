const Jimp = require('jimp')
const textToImage = require('text-to-image');

async function generateTexts(n) {
  const dataUri = await textToImage.generate(n.toString().padStart(2, "0"), {
    debug: true,
    debugFilename: `debug/${n.toString().padStart(2, "0")}.png`,
    maxWidth: 256,
    fontSize: 128,
    lineHeight: 160,
    fontFamily: 'Merriweather Sans',
    fontWeight: 900,
    verticalAlign: 'center',
    textAlign: 'center',
    bgColor: 'white',
    textColor: 'black',
  });
}

async function createTexture(n) {
  

  let image = new Jimp(1024, 768, 'white', (err, image) => {
    if (err) throw err
  });
  
  const textImage = await Jimp.read(`debug/${n.toString().padStart(2, "0")}.png`);

  await textImage.flip(true, false);
  
  await image.blit(textImage, 512, 256 + (256 - textImage.getHeight()) / 2);
  await image.blit(textImage, 768, 256 + (256 - textImage.getHeight()) / 2);

  await image.blit(textImage, 0, 256 + (256 - textImage.getHeight()) / 2);
  

  await textImage.flip(true, true);
   
  await image.blit(textImage, 256, (256 - textImage.getHeight()) / 2);  
  await image.blit(textImage, 256, 256 + (256 - textImage.getHeight()) / 2);
  await image.blit(textImage, 256, 512 + (256 - textImage.getHeight()) / 2);  
  
  await image.write(`D:/Unity/Project/My project/Assets/Nums/${n.toString()}.png`);
}

async function main() {
  const nums = [];
  for (let i = 0; i < 100; ++i) {
    nums.push(i);
  }

  // await Promise.all(nums.map(n => generateTexts(n)));
  await Promise.all(nums.map(n => createTexture(n)));
}

main();
