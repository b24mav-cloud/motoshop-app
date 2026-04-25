import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const children = [];

function run(name, command, args) {
  const child = spawn(command, args, {
    cwd: __dirname,
    stdio: 'inherit',
    shell: false,
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`${name} exited with code ${code}`);
      shutdown(code ?? 1);
    }
  });

  children.push(child);
}

function shutdown(code = 0) {
  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }

  process.exit(code);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

run('API server', process.execPath, ['server.js']);
run('Vite dev server', process.execPath, ['node_modules/vite/bin/vite.js']);
