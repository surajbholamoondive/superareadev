// scripts/upload-assets-to-cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import fg from 'fast-glob';
import pLimit from 'p-limit';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dgjhnlqjy',
  api_key: '748327158752775',  
  api_secret: 'yAoq5rUwoK3t-UMiMxamg8MOuIk',
  secure: true,
});

const LOCAL_ROOT = path.resolve(__dirname, './assets');
const CLOUDINARY_ROOT = '/assets';
const CONCURRENCY = 8;

// File patterns to include
const PATTERNS = [
  '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', 
  '**/*.webp', '**/*.bmp', '**/*.svg'
];

function toCloudinaryPath(localAbsPath) {
  const rel = path.relative(LOCAL_ROOT, localAbsPath).replaceAll('\\', '/');
  const withoutExt = rel.replace(/\.[^.]+$/, '');
  return `assets/${withoutExt}`;
}

function toCloudinaryUrl(public_id, format) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${public_id}.${format}`;
}

(async () => {
  try {
    const files = await fg(PATTERNS, { cwd: LOCAL_ROOT, absolute: true });
    console.log(`Found ${files.length} files to upload.`);

    const limit = pLimit(CONCURRENCY);
    const urlMapping = {};

    const uploads = files.map(file =>
      limit(async () => {
        const public_id = toCloudinaryPath(file);
        const ext = path.extname(file).slice(1).toLowerCase();
        
        try {
          const res = await cloudinary.uploader.upload(file, {
            public_id,
            overwrite: false,
            resource_type: 'auto',
            use_filename: true,
            unique_filename: false,
          });

          // Store mapping for later use
          const relativePath = path.relative(LOCAL_ROOT, file).replaceAll('\\', '/');
          urlMapping[`./assets/${relativePath}`] = res.secure_url;
          
          console.log(`✓ Uploaded: ${relativePath} -> ${res.secure_url}`);
          return { file, ok: true, url: res.secure_url };
        } catch (err) {
          console.error(`✗ Failed: ${file}`, err?.message || err);
          return { file, ok: false, error: err?.message || String(err) };
        }
      })
    );

    const results = await Promise.all(uploads);
    const successful = results.filter(r => r.ok);
    
    // Save URL mapping to JSON file
    await fs.writeFile(
      path.resolve(__dirname, '../asset-url-mapping.json'),
      JSON.stringify(urlMapping, null, 2)
    );

    console.log(`\n✓ Upload complete!`);
    console.log(`✓ Success: ${successful.length}, Failed: ${results.length - successful.length}`);
    console.log(`✓ URL mapping saved to: asset-url-mapping.json`);
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
