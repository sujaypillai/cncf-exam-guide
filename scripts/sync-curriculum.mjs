import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, copyFileSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const CURRICULUM_DIR = join(ROOT, '..', 'curriculum');
const PDFS_DIR = join(ROOT, 'public', 'pdfs');
const REPO_URL = 'https://github.com/cncf/curriculum.git';

// Clone curriculum repo if it doesn't exist (CI environment)
if (!existsSync(CURRICULUM_DIR)) {
  console.log('Cloning CNCF curriculum repository...');
  execSync(`git clone --depth 1 ${REPO_URL} "${CURRICULUM_DIR}"`, { stdio: 'inherit' });
} else {
  console.log('Curriculum repo already exists, pulling latest...');
  try {
    execSync('git pull --ff-only', { cwd: CURRICULUM_DIR, stdio: 'inherit' });
  } catch {
    console.log('Pull failed (likely not a git repo), skipping update.');
  }
}

// Copy PDFs to public/pdfs/
mkdirSync(PDFS_DIR, { recursive: true });
const pdfFiles = readdirSync(CURRICULUM_DIR).filter((f) => f.endsWith('.pdf'));
console.log(`Copying ${pdfFiles.length} PDF files...`);
for (const pdf of pdfFiles) {
  copyFileSync(join(CURRICULUM_DIR, pdf), join(PDFS_DIR, pdf));
}
console.log('Curriculum sync complete.');
