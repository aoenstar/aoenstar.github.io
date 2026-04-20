import {existsSync, rmSync, renameSync} from 'fs';

try {
  if (existsSync('docs')) {
    console.log('Removing existing docs/');
    rmSync('docs', {recursive: true, force: true});
  }

  if (existsSync('dist')) {
    console.log('Renaming dist -> docs');
    renameSync('dist', 'docs');
    console.log('Done: dist renamed to docs');
    process.exit(0);
  }

  console.error('No dist/ directory found to rename');
  process.exit(2);
} catch (err) {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
}
