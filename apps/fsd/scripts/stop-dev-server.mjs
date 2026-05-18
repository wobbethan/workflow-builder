/**
 * Stops a leftover `next dev` process (common on Windows/Git Bash when Ctrl+C
 * does not tear down the Node/webpack child tree).
 *
 * Uses Next's `.next/dev/lock` when present, then frees the dev port as fallback.
 */
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const lockPath = join(appRoot, '.next', 'dev', 'lock');
const defaultPort = Number(process.env.PORT) || 3000;

function killPid(pid) {
  if (!pid || Number.isNaN(Number(pid))) {
    return;
  }

  try {
    if (process.platform === 'win32') {
      // /T kills the process tree (webpack workers often outlive the parent).
      execSync(`taskkill /PID ${pid} /F /T`, { stdio: 'ignore' });
    } else {
      process.kill(Number(pid), 'SIGTERM');
    }
    console.log(`Stopped process ${pid}`);
  } catch {
    // Process may already be gone.
  }
}

function killPortListeners(port) {
  if (process.platform === 'win32') {
    try {
      const output = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
      const pids = new Set();

      for (const line of output.split('\n')) {
        if (!line.includes('LISTENING')) {
          continue;
        }
        const parts = line.trim().split(/\s+/);
        const pid = parts.at(-1);
        if (pid && pid !== '0') {
          pids.add(pid);
        }
      }

      for (const pid of pids) {
        killPid(pid);
      }
    } catch {
      // No listeners on this port.
    }
    return;
  }

  try {
    const output = execSync(`lsof -ti tcp:${port}`, { encoding: 'utf8' });
    for (const pid of output.trim().split('\n').filter(Boolean)) {
      killPid(pid);
    }
  } catch {
    // No listeners on this port.
  }
}

let port = defaultPort;

if (existsSync(lockPath)) {
  try {
    const lock = JSON.parse(readFileSync(lockPath, 'utf8'));
    if (lock.port) {
      port = lock.port;
    }
    if (lock.pid) {
      killPid(lock.pid);
    }
  } catch {
    // Ignore corrupt lock files.
  }

  try {
    unlinkSync(lockPath);
  } catch {
    // Ignore if already removed.
  }
}

killPortListeners(port);
