import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const chunkDir = 'src/generated/healer-water';
const chunkPaths = Array.from({ length: 9 }, (_, index) =>
  `${chunkDir}/a4.${String(index).padStart(2, '0')}.b64`,
);
const output = 'public/assets/c4/environment/settlement/env_healer_water_bridge_a.webp';
const expectedBytes = 51488;
const expectedSha256 = '54fdb1d8a787406ff05ab7437656d3da8031490caa7a149fbaeb13853aae61eb';

const parts = await Promise.all(chunkPaths.map((path) => readFile(path, 'utf8')));
const base64 = parts.join('').replace(/\s+/g, '');
const bytes = Buffer.from(base64, 'base64');

if (bytes.length !== expectedBytes) {
  throw new Error(`Unexpected A4 WebP byte length: ${bytes.length}; expected ${expectedBytes}`);
}
if (
  bytes.subarray(0, 4).toString('ascii') !== 'RIFF'
  || bytes.subarray(8, 12).toString('ascii') !== 'WEBP'
) {
  throw new Error('Embedded A4 payload is not a WebP RIFF file');
}

const digest = createHash('sha256').update(bytes).digest('hex');
if (digest !== expectedSha256) {
  throw new Error(`Unexpected A4 WebP SHA-256: ${digest}`);
}

await mkdir(dirname(output), { recursive: true });
await writeFile(output, bytes);
console.log(`Prepared embedded A4 WebP: ${output} (${bytes.length} bytes, sha256 ${digest})`);
