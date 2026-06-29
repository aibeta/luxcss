import { afterEach, describe, expect, it } from 'vitest';
import { promises as fs } from 'fs';
import * as os from 'os';
import * as path from 'path';
import { parseArgs, runCli } from './cli';

const tempDirs: string[] = [];

async function makeTempDir(): Promise<string> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'luxcss-cli-'));
  tempDirs.push(dir);
  return dir;
}

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true })));
});

describe('luxcss cli', () => {
  it('parses command line arguments', () => {
    expect(parseArgs(['--config', 'lux.config.js', '--root', 'src', '--dist', 'out.css', '--watch'])).toEqual({
      configPath: 'lux.config.js',
      root: 'src',
      dist: 'out.css',
      watch: true,
      help: false,
    });
  });

  it('builds using an auto-discovered lux.config.js file', async () => {
    const cwd = await makeTempDir();

    await fs.mkdir(path.join(cwd, 'src'), { recursive: true });
    await fs.writeFile(path.join(cwd, 'lux.config.js'), `
      module.exports = {
        root: './src',
        dist: './out/lux.css',
      };
    `);
    await fs.writeFile(path.join(cwd, 'src/index.html'), '<div class="l-d-f u-w12 u-bgcfff"></div>');

    await runCli([], cwd);

    const css = await fs.readFile(path.join(cwd, 'out/lux.css'), 'utf8');
    expect(css).toContain('.l-d-f {\n  display: flex;\n}');
    expect(css).toContain('.u-w12 {\n  width: 12px;\n}');
    expect(css).toContain('.u-bgcfff {\n  background-color: #fff;\n}');
  });

  it('lets CLI flags override config file values', async () => {
    const cwd = await makeTempDir();

    await fs.mkdir(path.join(cwd, 'src'), { recursive: true });
    await fs.mkdir(path.join(cwd, 'wrong'), { recursive: true });
    await fs.writeFile(path.join(cwd, 'lux.config.js'), `
      module.exports = {
        root: './wrong',
        dist: './wrong.css',
      };
    `);
    await fs.writeFile(path.join(cwd, 'src/index.html'), '<div class="u-h34"></div>');
    await fs.writeFile(path.join(cwd, 'wrong/index.html'), '<div class="u-h999"></div>');

    await runCli(['--root', './src', '--dist', './custom.css'], cwd);

    const css = await fs.readFile(path.join(cwd, 'custom.css'), 'utf8');
    expect(css).toContain('.u-h34 {\n  height: 34px;\n}');
    expect(css).not.toContain('999px');
  });
});
