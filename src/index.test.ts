import { afterEach, describe, expect, it } from 'vitest';
import { promises as fs } from 'fs';
import * as os from 'os';
import * as path from 'path';
import { buildProject, watchProject } from './index';

const tempDirs: string[] = [];

async function makeTempDir(): Promise<string> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'luxcss-'));
  tempDirs.push(dir);
  return dir;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitFor(assertion: () => Promise<void> | void, timeoutMs = 3000): Promise<void> {
  const start = Date.now();
  let lastError: unknown;

  while (Date.now() - start < timeoutMs) {
    try {
      await assertion();
      return;
    } catch (error) {
      lastError = error;
      await sleep(50);
    }
  }

  throw lastError;
}

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true })));
});

describe('luxcss project build', () => {
  it('scans a project, ignores generated/hidden/dependency files, and writes expected CSS', async () => {
    const root = await makeTempDir();
    const dist = path.join(root, 'generated.css');

    await fs.mkdir(path.join(root, 'components'), { recursive: true });
    await fs.mkdir(path.join(root, '.hidden'), { recursive: true });
    await fs.mkdir(path.join(root, 'node_modules/pkg'), { recursive: true });

    await fs.writeFile(path.join(root, 'index.html'), `
      <div class="l-d-f l-center u-w80 u-lh1d5 u-t150p u-w33p33 u-z1n u-bgc00b51d u-cfff">
        Button
      </div>
    `);

    await fs.writeFile(path.join(root, 'components/Button.tsx'), `
      export const Button = () => <button className="l-pos-r u-ml-20 u-h30">Button</button>;
    `);

    // This is the configured output file. Even though it contains valid class names,
    // it must not be scanned, otherwise the watcher can feed on its own output.
    await fs.writeFile(dist, '<div class="u-w999 l-d-b"></div>');

    await fs.writeFile(path.join(root, '.hidden/secret.html'), '<div class="u-w777"></div>');
    await fs.writeFile(path.join(root, 'node_modules/pkg/index.html'), '<div class="u-w888"></div>');
    await fs.writeFile(path.join(root, 'image.png'), 'u-w666');

    const result = await buildProject({ root, dist }, { log: false });
    const writtenCss = await fs.readFile(dist, 'utf8');

    expect(result.css).toBe(writtenCss);
    expect(result.files.map((file) => path.relative(root, file)).sort()).toEqual([
      'components/Button.tsx',
      'index.html',
    ]);

    expect(writtenCss).toContain('.l-d-f {\n  display: flex;\n}');
    expect(writtenCss).toContain('.l-center {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}');
    expect(writtenCss).toContain('.l-pos-r {\n  position: relative;\n}');
    expect(writtenCss).toContain('.u-w80 {\n  width: 80px;\n}');
    expect(writtenCss).toContain('.u-h30 {\n  height: 30px;\n}');
    expect(writtenCss).toContain('.u-ml-20 {\n  margin-left: -20px;\n}');
    expect(writtenCss).toContain('.u-lh1d5 {\n  line-height: 1.5;\n}');
    expect(writtenCss).toContain('.u-t150p {\n  top: 150%;\n}');
    expect(writtenCss).toContain('.u-w33p33 {\n  width: 33.33%;\n}');
    expect(writtenCss).toContain('.u-z1n {\n  z-index: 1;\n}');
    expect(writtenCss).toContain('.u-bgc00b51d {\n  background-color: #00b51d;\n}');
    expect(writtenCss).toContain('.u-cfff {\n  color: #fff;\n}');

    expect(writtenCss).not.toContain('999px');
    expect(writtenCss).not.toContain('888px');
    expect(writtenCss).not.toContain('777px');
    expect(writtenCss).not.toContain('666px');
    expect(writtenCss).not.toContain('.u-lh1 {');
    expect(writtenCss).not.toContain('.u-t150 {');
    expect(writtenCss).not.toContain('.u-w33 {');
  });

  it('watches a project and rebuilds when source files change', async () => {
    const root = await makeTempDir();
    const dist = path.join(root, 'generated.css');
    const sourceFile = path.join(root, 'index.html');

    await fs.writeFile(sourceFile, '<div class="u-w10"></div>');

    const watcher = await watchProject({ root, dist }, { log: false });

    try {
      await new Promise<void>((resolve) => watcher.on('ready', resolve));

      await waitFor(async () => {
        const css = await fs.readFile(dist, 'utf8');
        expect(css).toContain('.u-w10 {\n  width: 10px;\n}');
      });

      await fs.writeFile(sourceFile, '<div class="u-w20"></div>');

      await waitFor(async () => {
        const css = await fs.readFile(dist, 'utf8');
        expect(css).toContain('.u-w20 {\n  width: 20px;\n}');
        expect(css).not.toContain('.u-w10 {');
      });
    } finally {
      await watcher.close();
    }
  });
});
