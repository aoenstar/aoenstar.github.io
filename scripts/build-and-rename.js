import {execSync} from 'child_process';
import {existsSync, rmSync, renameSync} from 'fs';

try {
  // Run vite build (shows output)
  execSync('npx vite build', {stdio: 'inherit'});

  // Remove existing docs folder if present
  if (existsSync('docs')) {
    console.log('Removing existing docs/');
    rmSync('docs', {recursive: true, force: true});
  }

  // Rename dist -> docs
  if (existsSync('dist')) {
    console.log('Renaming dist -> docs');
    renameSync('dist', 'docs');
    console.log('Done: dist renamed to docs');
  } else {
    console.error('Build did not produce a dist/ directory');
    process.exit(2);
  }
} catch (err) {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
}
