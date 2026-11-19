import { copyFile, lstat, mkdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, '_site');
if (path.relative(root, output) !== '_site') throw new Error('Invalid output directory');
try {
  if ((await lstat(output)).isSymbolicLink()) throw new Error('Output cannot be a symlink');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const files = [
  'index.html',
  'style.css',
  '.nojekyll',
  'assets/favicon.svg',
  'assets/pawel-i-magda.jpg',
  'assets/social-preview.png',
  'assets/fonts/inter-400.ttf',
  'assets/fonts/inter-500.ttf',
  'assets/fonts/lora-400.ttf',
  'assets/fonts/inter-OFL.txt',
  'assets/fonts/lora-OFL.txt',
];
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const css = await readFile(path.join(root, 'style.css'), 'utf8');
if (/name=["']robots["'][^>]*noindex/i.test(html)) throw new Error('Remove draft noindex before deployment');
if (html.includes('\uFFFD') || css.includes('\uFFFD')) throw new Error('Invalid text encoding');
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
const refs = [
  ...[...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(match => match[1]),
  ...[...css.matchAll(/url\(([^)]+)\)/g)].map(match => match[1].replace(/^['"]|['"]$/g, '')),
];
for (const ref of refs) {
  if (/^(https?:|mailto:|tel:|data:)/i.test(ref)) continue;
  if (ref.startsWith('#')) {
    if (!ids.has(ref.slice(1))) throw new Error('Missing anchor: ' + ref);
    continue;
  }
  const local = ref.split(/[?#]/)[0];
  if (!files.includes(local)) throw new Error('Asset is not in the deployment manifest: ' + local);
}
for (const file of files) {
  const info = await lstat(path.join(root, file));
  if (!info.isFile() || info.isSymbolicLink()) throw new Error('Expected a regular file: ' + file);
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
let bytes = 0;
for (const file of files) {
  const destination = path.join(output, file);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(path.join(root, file), destination);
  bytes += (await lstat(destination)).size;
}
console.log('Validated and prepared ' + files.length + ' files (' + bytes + ' bytes) in _site/');
