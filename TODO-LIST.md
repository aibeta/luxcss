# TODO

This file tracks unfinished work discovered while reviewing the repository. The highest priority is to make luxcss runnable and correct before adding new features.

## P0 — Make the project runnable

- [x] Fix `package.json` entrypoints.
  - Current `main` is `app.js`, but `app.js` does not exist.
  - Current `start` is `node app.js`, so `npm start` cannot work.
  - Suggested scripts:
    - `build`: `tsc`
    - `watch`: `ts-node src/cli.ts --watch`
    - `start`: alias to `watch` during development
    - `test`: `vitest run`
    - `test:watch`: `vitest`
- [x] Decide whether this package is a CLI, a library, or both. Current shape supports both: CLI entrypoint plus exported build/watch API.
- [x] Add a real CLI entrypoint if this should be used from other projects.
- [x] Make startup generate CSS once before entering watch mode.
  - Current `runApp()` only watches files; it does not call `main(full_paths)` initially.
- [x] Fix output-file watching.
  - `distPath = path.join(__dirname, dist)` is wrong when `dist` is relative to repo root.
  - The generated CSS file can be included in the watched file list and retrigger generation.
- [x] Rebuild or remove stale `dist/` artifacts.
  - `dist/index.js` references `./oper/main`, which does not exist in the current source tree.
  - `dist/` should be reproducible from `npm run build`.

## P1 — Fix CSS generation correctness

- [x] Fix enum generation in `src/oper/sass.template.ts`.
  - Current code uses `enumValue.d`.
  - It should use `enumValue[d]`.
  - This currently causes enum utilities such as `l-pos-r` / `l-d-f` to generate incorrect CSS.
- [x] Support multi-declaration enum utilities correctly.
  - Example: `l-center` maps to multiple declarations.
  - Current template splits on `:` and only keeps part of the declaration.
- [x] Add token-boundary-safe class matching.
  - Regexes should not match partial classes inside longer strings.
  - They should handle HTML class attributes, JSX strings, template literals, and plain text safely.
- [x] Fix numeric regex overlap.
  - `u-lh1d5` currently also matches `u-lh1`.
  - `u-t150p` can also match `u-t150`.
  - `u-z1n` can also match `u-z1`.
- [x] Fix percent decimal syntax.
  - README examples historically mention `u-w33p33 -> width: 33.33%`.
  - Current implementation treats `p` mostly as `%`, not as a decimal separator before `%`.
- [x] Fix color regex character classes.
  - `[a-f|A-F|0-9]` includes the literal `|` character.
  - Use a proper hex pattern such as `[a-fA-F0-9]{3}(?:[a-fA-F0-9]{3})?`.
- [x] Validate unknown property prefixes before generating CSS.
- [x] Add deterministic sorting so generated CSS output is stable between runs.
- [ ] Decide whether generated class names should be escaped for special characters.

## P2 — Add tests

- [x] Add unit tests for `matchEnum`, `matchUnit`, `matchColor`, and `filter`.
- [x] Add unit tests for `extractEnum`, `extractUnit`, and `extractColor`.
- [x] Add assertion tests for `makeLessTemplate`.
- [x] Add integration tests that scan fixture files and compare generated CSS.
- [x] Add watcher integration test for rebuild-on-change behavior.
- [x] Add CLI/config integration tests.
- [x] Test negative values: `u-ml-20`.
- [x] Test decimals: `u-lh1d5`.
- [x] Test percentages: `u-w50p`, `u-w33p33` if supported.
- [x] Test unitless values: `u-z1n`, `u-op0d5`.
- [x] Test colors: 3-digit and 6-digit hex values.
- [x] Test enum aliases, especially multi-declaration aliases like `l-center`.
- [x] Make `npm test` pass in this checkout.

## P3 — Configuration cleanup

- [ ] Choose one configuration API.
  - Active config is currently `src/config.js`.
  - `config/base.ts` and `config/unit.ts` appear unused or legacy.
- [ ] Move runtime config out of `src/` if this is intended to be used by external projects.
- [x] Support a project config file, for example `lux.config.js`.
- [ ] Add include/exclude globs.
- [x] Always exclude generated output paths from scanning and watching.
- [ ] Support custom default unit.
- [ ] Decide whether `config/unit.ts` should enable `px`, `rem`, `em`, `vw`, `vh`, `rpx`, etc.
- [ ] Add optional compressed output.
- [ ] Add optional Sass/Less source output only if still needed.

## P4 — Improve file and watch behavior

- [x] Replace callback-based `fs` calls with `fs.promises`.
- [x] Make `read()` handle an empty file list.
- [ ] Make `read()` continue after one unreadable file, or fail with a clear error.
- [x] Ignore binary files and unsupported extensions.
- [x] Add extension filters for `.html`, `.vue`, `.jsx`, `.tsx`, `.js`, `.ts`, etc.
- [x] Debounce watcher events before regenerating CSS.
- [x] Re-scan the file tree when files are added or removed, not only changed.
- [x] Ensure the output directory exists before writing CSS.
- [x] Return a Promise from `write()` so errors can be handled.

## P5 — Package quality

- [ ] Fill in `package.json` metadata:
  - `description`
  - `author`
  - `license`
  - `repository`
  - `keywords`
  - correct `main` / `bin` / `files` (`main`, `bin`, and `files` are now set)
- [x] Decide whether generated build output belongs in git. `dist/` is now ignored and built during prepack; example CSS remains tracked as a fixture.
- [x] Update remaining dependencies.
  - Test runner has moved from Jest to Vite/Vitest.
  - TypeScript and ts-node have been upgraded.
  - Chokidar has been upgraded.
  - TSLint has been removed and replaced with ESLint.
- [x] Prefer the modern Sass `compileString` API, with callback fallback.
- [x] Add linting tooling. ESLint is configured in `eslint.config.mjs`. Formatting/Prettier is still optional.
- [x] Add CI to run `npm run check`.
- [ ] Add semantic versioning and release notes.

## P6 — Documentation improvements

- [x] Document every supported enum abbreviation or generate docs from `src/base.js` in `docs/utilities.md`.
- [x] Document every numeric property abbreviation in `docs/utilities.md`.
- [ ] Document exact grammar for:
  - default unit values
  - negative values
  - decimals
  - percentages
  - unitless values
  - colors
- [ ] Document current limitations and unsupported syntax.
- [ ] Add before/after examples for common components.
- [ ] Add troubleshooting notes for watcher loops and missing output.
- [ ] Add migration notes if the old `lux-` prefix is no longer supported.

## P7 — Future features

- [x] Add a visual class-name editor with live generated CSS preview.
- [ ] Implement custom aliases / compositions.
  - Historical README mentioned something like: `"x-button": "u-fz12 u-p10"`.
- [ ] Allow user-defined enum utilities.
- [ ] Allow user-defined property abbreviations.
- [ ] Add a dry-run mode that prints matched classes without writing CSS.
- [ ] Add a watch status summary: files scanned, classes found, CSS size, output path.
- [ ] Add minified and pretty output modes.
- [ ] Consider generating source maps only when useful.

## Suggested MVP completion checklist

The repository can be considered usable when all of these are true:

- [x] `npm install` works in this checkout.
- [x] `npm run build` produces a valid ignored `dist/` directory.
- [x] `npm start` or `npm run watch` starts the watcher.
- [x] The watcher performs an initial CSS generation.
- [x] Editing `src/example/test.html` updates `src/example/test.css` once, without a loop.
- [x] `l-d-f` generates `display: flex;`.
- [x] `l-center` generates all of its declarations.
- [x] `u-lh1d5` generates only `line-height: 1.5;`, not an extra `u-lh1` rule.
- [x] `u-t150p` generates only `top: 150%;`, not an extra `u-t150` rule.
- [x] `u-bgc00b51d` generates `background-color: #00b51d;`.
- [x] `npm test` passes.
