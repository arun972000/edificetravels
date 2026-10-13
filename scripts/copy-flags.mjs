// Copies the flag of every country in the picker (plus India) from
// country-flag-icons (MIT) into public/flags, so each flag is a small static
// file that loads only when the picker shows it. Run: npm run flags
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'src/data/countries.ts'), 'utf8');
const codes = [...src.matchAll(/code: '([A-Z]{2})'/g)].map(m => m[1]);
const all = [...new Set([...codes, 'IN', 'GB', 'DE', 'FR', 'ES', 'IT'])];
const out = join(root, 'public/flags');
mkdirSync(out, { recursive: true });
for (const c of all) copyFileSync(join(root, 'node_modules/country-flag-icons/3x2', `${c}.svg`), join(out, `${c.toLowerCase()}.svg`));
console.log(`Copied ${all.length} flags to public/flags`);
