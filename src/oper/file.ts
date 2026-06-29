import { promises as fs } from 'fs';
import * as path from 'path';
import { filter } from './match';

const sass = require('sass');

// path: /a/b or a/b/c.md
type Path = string;
// absolute path of a file or directory
type FullPaths = Path[];

interface ReadResult {
  enumList: string[];
  unitList: string[];
  colorList: string[];
}

async function readFile(filePath: Path): Promise<string> {
  const data = await fs.readFile(filePath);
  return data.toString();
}

export async function read(filePaths: FullPaths = []): Promise<ReadResult> {
  const result: ReadResult = {
    enumList: [],
    unitList: [],
    colorList: [],
  };

  await Promise.all(filePaths.map(async (filePath) => {
    const fileStr = await readFile(filePath);
    const { enums, unit, color } = filter(fileStr);

    result.enumList.push(...enums);
    result.unitList.push(...unit);
    result.colorList.push(...color);
  }));

  return result;
}

export async function write(content: string, fullPath: Path): Promise<void> {
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, content);
}

export function renderSass(content: string): Promise<string> {
  if (typeof sass.compileString === 'function') {
    const output = sass.compileString(content, { style: 'expanded' });
    return Promise.resolve(output.css);
  }

  return new Promise((resolve, reject) => {
    sass.render({ data: content }, (error: Error, output: { css: Buffer }) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(output.css.toString());
    });
  });
}

export default {
  read,
  write,
  renderSass,
};
