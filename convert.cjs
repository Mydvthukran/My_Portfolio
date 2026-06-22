const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const filesToConvert = [
  { in: 'public/batman-bg.png', out: 'public/batman-bg.webp', quality: 50 },
  { in: 'public/moonknight-bg.png', out: 'public/moonknight-bg.webp', quality: 50 },
  { in: 'src/assets/me/hero-cinematic.png', out: 'src/assets/me/hero-cinematic.webp', quality: 50 },
  { in: 'src/assets/easter-egg/gauntlet.png', out: 'src/assets/easter-egg/gauntlet.webp', quality: 50 }
];

async function convert() {
  for (const file of filesToConvert) {
    const inPath = path.join(__dirname, file.in);
    const outPath = path.join(__dirname, file.out);
    
    if (fs.existsSync(inPath)) {
      try {
        await sharp(inPath)
          .webp({ quality: file.quality })
          .toFile(outPath);
        
        const stats = fs.statSync(outPath);
        console.log(`Converted ${file.in} to WebP. Size: ${(stats.size / 1024).toFixed(2)} KB`);
        
        // delete original
        fs.unlinkSync(inPath);
      } catch (err) {
        console.error(`Error converting ${file.in}:`, err);
      }
    } else {
      console.log(`File not found: ${file.in}`);
    }
  }
}

convert();
