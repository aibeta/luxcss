import { describe, expect, it } from 'vitest';
import { filter } from './match';

describe('filter', () => {
  it('extracts enum, unit, and color utilities', () => {
    const result = filter('<div class="l-d-f l-center u-w80 u-bgceee"></div>');

    expect(result.enums).toEqual(['l-d-f', 'l-center']);
    expect(result.unit).toEqual(['u-w80']);
    expect(result.color).toEqual(['u-bgceee']);
  });

  it('does not emit partial numeric matches', () => {
    const result = filter('<div class="u-lh1d5 u-t150p u-w33p33 u-z1n"></div>');

    expect(result.unit).toEqual(['u-lh1d5', 'u-t150p', 'u-w33p33', 'u-z1n']);
    expect(result.unit).not.toContain('u-lh1');
    expect(result.unit).not.toContain('u-t150');
    expect(result.unit).not.toContain('u-w33');
    expect(result.unit).not.toContain('u-z1');
  });

  it('respects class boundaries', () => {
    const result = filter('not-u-w80 .u-h30 { color: red; } x-l-d-f "l-d-b"');

    expect(result.unit).toEqual(['u-h30']);
    expect(result.enums).toEqual(['l-d-b']);
  });
});
