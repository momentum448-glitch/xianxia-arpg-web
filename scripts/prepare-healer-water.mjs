import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const source = 'public/assets/c4/environment/settlement/env_healer_water_bridge_a.png';
const output = 'public/assets/c4/environment/settlement/env_healer_water_bridge_a_rgba.png';

await mkdir(dirname(output), { recursive: true });
await sharp(source)
  .ensureAlpha()
  .png({ palette: false, compressionLevel: 9 })
  .toFile(output);

console.log(`Prepared RGBA runtime texture: ${output}`);
