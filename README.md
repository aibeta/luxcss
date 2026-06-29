# luxcss

`luxcss` is a small atomic CSS generator. It scans your source files, extracts the utility classes you actually use, and writes a CSS file containing only those rules.

The project is a runnable TypeScript prototype. The core watcher, parser, generator, CLI entrypoint, config loader, build script, and tests are in place. The next major step is polishing the package for real npm distribution.

## What it does

Given markup like this:

```html
<div class="l-d-f l-center u-w110 u-h30 u-bgc00b51d u-cfff u-bdrs4 u-fz14">
  Button
</div>
```

luxcss generates CSS like this:

```css
.l-d-f {
  display: flex;
}

.l-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.u-w110 {
  width: 110px;
}

.u-h30 {
  height: 30px;
}

.u-bgc00b51d {
  background-color: #00b51d;
}

.u-cfff {
  color: #fff;
}

.u-bdrs4 {
  border-radius: 4px;
}

.u-fz14 {
  font-size: 14px;
}
```

## Current status

Implemented:

- Recursive source scanning from a configured root directory.
- File watching with `chokidar`.
- Initial CSS generation before watch mode starts.
- Output-file exclusion to avoid self-triggered watch loops.
- Debounced rebuilds.
- Class extraction for:
  - enum utilities: `l-...`
  - numeric utilities: `u-...`
  - color utilities: `u-...<hex>`
- Correct enum generation, including multi-declaration aliases such as `l-center`.
- Boundary-safe matching, so partial class names are not extracted by accident.
- Vite/Vitest tests for matching, extraction, CSS generation, editor generation, CLI config loading, whole-project builds, and watcher rebuilds.
- Reproducible build output in `dist/`.
- A CLI entrypoint exposed as `luxcss` after build/package install.
- External config discovery through `lux.config.js` or `luxcss.config.js`.
- A Vite-powered visual editor for editing class names and previewing generated CSS.

Still unfinished:

- CLI/package polish before publishing.
- `config/base.ts` and `config/unit.ts` appear to be legacy or planned config files.
- CI is configured to run `npm run check` on push and pull request.
- Utility docs are generated manually for now; add an automated generation script if the registry changes often.

See [`TODO-LIST.md`](./TODO-LIST.md) for the remaining work.

## How it works

```text
source files
  -> src/cli.ts or src/index.ts API
      -> load src/config.js or lux.config.js
      -> scan configured root
      -> read supported source files
      -> src/oper/match.ts extracts class tokens
      -> src/oper/extract.ts deduplicates and groups tokens
      -> src/oper/sass.template.ts generates CSS/Sass-compatible text
      -> src/oper/file.ts compiles with Sass and writes output
      -> chokidar watches for add/change/unlink and rebuilds
```

Important files:

| Path | Purpose |
|---|---|
| `src/index.ts` | Main build/watch API and orchestrator |
| `src/cli.ts` | CLI argument parsing and command entrypoint |
| `src/config-loader.ts` | External config discovery/loading |
| `src/config.js` | Default runtime config: source root, output path, default unit |
| `src/base.js` | Utility registry: enum, numeric, and color property mappings |
| `src/cheat/*.js` | CSS declaration dictionaries used by enum utilities |
| `src/oper/match.ts` | Regex-based class extraction |
| `src/oper/extract.ts` | Deduplication and token grouping |
| `src/oper/sass.template.ts` | CSS template generation |
| `src/oper/file.ts` | File reading, CSS writing, Sass rendering |
| `src/example/` | Example source files and generated CSS |
| `playground/` | Vite visual editor for class-name editing and CSS preview |
| `vite.playground.config.ts` | Vite config for the visual editor |
| `vite.luxcss-registry-plugin.ts` | Vite plugin that exposes `src/base.js` to the browser editor |
| `src/index.test.ts` | Whole-project build/watch tests using temporary fixture projects |
| `src/cli.test.ts` | CLI and config-loading tests |
| `vitest.config.ts` | Vite/Vitest test configuration |
| `docs/utilities.md` | Generated utility reference |
| `TODO-LIST.md` | Remaining work and roadmap |

## Installation

```bash
npm install
```

## Commands

```bash
# Generate dist/ from TypeScript source
npm run build

# Run tests, lint, and TypeScript build
npm run check

# Run ESLint
npm run lint

# Build CSS once using the CLI
npm run build:css

# Start the CSS generator watcher using the CLI
npm run watch

# Start the visual class-name/CSS editor
npm run editor

# Build the visual editor
npm run editor:build

# Alias for npm run watch
npm start

# Run the Vite/Vitest test suite
npm test

# Run Vitest in watch mode
npm run test:watch

# Remove dist/
npm run clean
```

## Visual editor

Run the editor with:

```bash
npm run editor
```

Open the printed Vite URL, usually:

```text
http://localhost:5173/
```

The editor has:

- a left pane for editing luxcss class names or pasted HTML
- a right pane with a live visual preview
- a generated CSS output panel
- unsupported-class reporting for tokens that look like `l-*` or `u-*` but are not supported yet

The editor uses the same `src/base.js` registry through `vite.luxcss-registry-plugin.ts`, so its supported utility list stays aligned with the generator.

## Configuration

The default config is `src/config.js`:

```js
const config = {
  unit: 'px',
  root: './src/example',
  dist: './src/example/test.css',
};

module.exports = config;
```

| Field | Meaning |
|---|---|
| `unit` | Default unit appended to numeric utilities, currently `px` |
| `root` | Directory recursively scanned for class names |
| `dist` | CSS output file |

For real usage, create `lux.config.js` or `luxcss.config.js` in your project root:

```js
module.exports = {
  root: './src',
  dist: './dist/lux.css',
};
```

Then run:

```bash
# Build once
npx luxcss

# Watch and rebuild
npx luxcss --watch

# Use a specific config file
npx luxcss --config ./lux.config.js

# Override config fields from the command line
npx luxcss --root ./src --dist ./dist/lux.css
```

## Utility syntax

### 1. Enum utilities: `l-<token>`

Enum utilities map a short class name to a fixed CSS declaration from `src/base.js` and `src/cheat/*.js`.

Examples:

| Class | CSS |
|---|---|
| `l-pos-r` | `position: relative;` |
| `l-d-b` | `display: block;` |
| `l-d-f` | `display: flex;` |
| `l-cur-p` | `cursor: pointer;` |
| `l-ta-c` | `text-align: center;` |
| `l-center` | `display: flex; align-items: center; justify-content: center;` |

### 2. Numeric utilities: `u-<property><value>`

Numeric utilities map a property abbreviation to a numeric value.

Examples:

| Class | CSS |
|---|---|
| `u-w80` | `width: 80px;` |
| `u-h30` | `height: 30px;` |
| `u-mt12` | `margin-top: 12px;` |
| `u-ml-20` | `margin-left: -20px;` |
| `u-lh1d5` | `line-height: 1.5;` |
| `u-t150p` | `top: 150%;` |
| `u-w33p33` | `width: 33.33%;` |
| `u-z1n` | `z-index: 1;` |

Common numeric property abbreviations:

| Prefix | CSS property |
|---|---|
| `w` | `width` |
| `h` | `height` |
| `t` / `r` / `b` / `l` | `top` / `right` / `bottom` / `left` |
| `mt` / `mr` / `mb` / `ml` | margin sides |
| `pt` / `pr` / `pb` / `pl` | padding sides |
| `fz` | `font-size` |
| `lh` | `line-height` |
| `bdrs` | `border-radius` |
| `bdw` | `border-width` |
| `z` | `z-index` |
| `op` | `opacity` |
| `fx` | `flex` |
| `fw` | `font-weight` |

The full list is in `unitValue` inside `src/base.js` and [`docs/utilities.md`](./docs/utilities.md).

### 3. Color utilities: `u-<property><hex>`

Color utilities use a 3-digit or 6-digit hex value without the leading `#`.

| Class | CSS |
|---|---|
| `u-cfff` | `color: #fff;` |
| `u-bgc00b51d` | `background-color: #00b51d;` |
| `u-bdceee` | `border-color: #eee;` |
| `u-bdtc999` | `border-top-color: #999;` |

Supported color prefixes:

| Prefix | CSS property |
|---|---|
| `c` | `color` |
| `bgc` | `background-color` |
| `bdc` | `border-color` |
| `bdtc` | `border-top-color` |
| `bdbc` | `border-bottom-color` |
| `bdlc` | `border-left-color` |
| `bdrc` | `border-right-color` |

## Example

`src/example/test.html` contains classes using the current `l-` / `u-` syntax:

```html
<div class="l-pos l-d-b u-w80 u-bgceee u-lh1d5 u-t150p l-d-f u-ml-20">
  按钮
</div>
```

Running `npm run watch` or `npm start` writes `src/example/test.css`.

## Development notes

- `npm run build` cleans and rebuilds `dist/`.
- `npm run prepack` builds `dist/` before packaging.
- GitHub Actions CI runs `npm run check` on push and pull request.
- Linting runs through ESLint using `eslint.config.mjs`.
- The visual editor runs through Vite using `vite.playground.config.ts`.
- Tests run through Vitest using `vitest.config.ts`.
- Unit tests live next to the operator modules under `src/oper/*.test.ts`.
- `src/index.test.ts` runs end-to-end project build and watcher tests against temporary fixture projects.
- `src/cli.test.ts` verifies CLI parsing, external config discovery, and CLI override behavior.
- Generated CSS output is deterministic enough for tests and review because extracted values are deduplicated and sorted.

## Roadmap

1. Add remaining package publishing metadata such as repository, keywords, and author.
2. Decide how far to modernize module output and runtime config.
3. Add an automated docs generation script if the utility registry changes often.
