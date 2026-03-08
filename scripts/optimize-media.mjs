import sharp from 'sharp';
import { execSync } from 'child_process';
import { readdirSync, statSync, existsSync, renameSync, mkdirSync } from 'fs';
import { join, extname, basename } from 'path';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const publicDir = join(process.cwd(), 'public');
const ffmpegPath = ffmpegInstaller.path;

// Step 1: Rename files to remove spaces
const renameMap = {
  'Accessible Power, Sophisticated Performance.png': 'accessible-power.png',
  'Business Professionals.jpg': 'business-professionals.jpg',
  'Drudgery.png': 'drudgery.png',
  'Escape Operational Drudgery123.jpg': 'escape-drudgery.jpg',
  'Future-Proof Your Operations with Our Services.png': 'future-proof-operations.png',
  'Marketing Managers.png': 'marketing-managers.png',
  'Marketing Managers123.png': 'marketing-managers-impact.png',
  'Operations Leads.jpg': 'operations-leads.jpg',
  'Our Vision.png': 'our-vision.png',
};

console.log('=== Step 1: Renaming files ===');
for (const [oldName, newName] of Object.entries(renameMap)) {
  const oldPath = join(publicDir, oldName);
  const newPath = join(publicDir, newName);
  if (existsSync(oldPath)) {
    renameSync(oldPath, newPath);
    console.log(`  Renamed: ${oldName} -> ${newName}`);
  }
}

// Step 2: Compress images with sharp
console.log('\n=== Step 2: Compressing images ===');
const imageFiles = readdirSync(publicDir).filter(f =>
  ['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase()) && f !== 'infiniteo.png'
);

for (const file of imageFiles) {
  const filePath = join(publicDir, file);
  const ext = extname(file).toLowerCase();
  const sizeBefore = statSync(filePath).size;

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Resize if wider than 1200px
    const maxWidth = 1200;
    const resizeOpts = metadata.width > maxWidth ? { width: maxWidth } : {};

    if (ext === '.png') {
      const buffer = await sharp(filePath)
        .resize(resizeOpts)
        .png({ quality: 80, compressionLevel: 9 })
        .toBuffer();

      // Also create WebP version
      const webpPath = filePath.replace('.png', '.webp');
      await sharp(filePath)
        .resize(resizeOpts)
        .webp({ quality: 75 })
        .toFile(webpPath);

      // Overwrite original with compressed version
      await sharp(buffer).toFile(filePath);

      const sizeAfter = statSync(filePath).size;
      const webpSize = statSync(webpPath).size;
      console.log(`  ${file}: ${(sizeBefore/1024).toFixed(0)}KB -> ${(sizeAfter/1024).toFixed(0)}KB (PNG) / ${(webpSize/1024).toFixed(0)}KB (WebP)`);
    } else {
      const buffer = await sharp(filePath)
        .resize(resizeOpts)
        .jpeg({ quality: 75, mozjpeg: true })
        .toBuffer();

      // Also create WebP version
      const webpPath = filePath.replace(/\.(jpg|jpeg)$/i, '.webp');
      await sharp(filePath)
        .resize(resizeOpts)
        .webp({ quality: 70 })
        .toFile(webpPath);

      await sharp(buffer).toFile(filePath);

      const sizeAfter = statSync(filePath).size;
      const webpSize = statSync(webpPath).size;
      console.log(`  ${file}: ${(sizeBefore/1024).toFixed(0)}KB -> ${(sizeAfter/1024).toFixed(0)}KB (JPG) / ${(webpSize/1024).toFixed(0)}KB (WebP)`);
    }
  } catch (err) {
    console.error(`  Error compressing ${file}:`, err.message);
  }
}

// Compress logo separately (smaller, keep quality higher)
const logoPath = join(publicDir, 'infiniteo.png');
if (existsSync(logoPath)) {
  const sizeBefore = statSync(logoPath).size;
  const webpPath = join(publicDir, 'infiniteo.webp');
  await sharp(logoPath).webp({ quality: 85 }).toFile(webpPath);
  await sharp(logoPath).png({ quality: 85, compressionLevel: 9 }).toFile(logoPath + '.tmp');
  renameSync(logoPath + '.tmp', logoPath);
  const sizeAfter = statSync(logoPath).size;
  console.log(`  infiniteo.png: ${(sizeBefore/1024).toFixed(0)}KB -> ${(sizeAfter/1024).toFixed(0)}KB`);
}

// Step 3: Convert video.gif to MP4
console.log('\n=== Step 3: Converting video.gif to MP4 ===');
const gifPath = join(publicDir, 'video.gif');
const mp4Path = join(publicDir, 'video.mp4');
const webmPath = join(publicDir, 'video.webm');

if (existsSync(gifPath)) {
  const gifSize = statSync(gifPath).size;
  console.log(`  Original GIF size: ${(gifSize / 1024 / 1024).toFixed(1)}MB`);

  try {
    // Convert GIF to MP4 using ffmpeg
    console.log('  Converting to MP4...');
    execSync(`"${ffmpegPath}" -i "${gifPath}" -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -preset slow -crf 28 -y "${mp4Path}"`, { stdio: 'pipe' });

    const mp4Size = statSync(mp4Path).size;
    console.log(`  MP4 size: ${(mp4Size / 1024 / 1024).toFixed(1)}MB`);

    // Also create WebM version
    console.log('  Converting to WebM...');
    execSync(`"${ffmpegPath}" -i "${gifPath}" -c:v libvpx-vp9 -crf 35 -b:v 0 -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -y "${webmPath}"`, { stdio: 'pipe' });

    const webmSize = statSync(webmPath).size;
    console.log(`  WebM size: ${(webmSize / 1024 / 1024).toFixed(1)}MB`);

    // Also extract a poster frame
    const posterPath = join(publicDir, 'video-poster.jpg');
    execSync(`"${ffmpegPath}" -i "${gifPath}" -vframes 1 -q:v 5 -y "${posterPath}"`, { stdio: 'pipe' });
    console.log('  Extracted poster frame');

    console.log(`\n  Compression: ${(gifSize / 1024 / 1024).toFixed(1)}MB -> ${(mp4Size / 1024 / 1024).toFixed(1)}MB (MP4) = ${((1 - mp4Size/gifSize) * 100).toFixed(0)}% reduction`);
  } catch (err) {
    console.error('  Error converting GIF:', err.message);
  }
}

console.log('\n=== Done! ===');
