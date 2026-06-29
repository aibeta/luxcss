import { describe, expect, it } from 'vitest';
import { extractColor, extractEnum, extractUnit } from './extract';

describe('extract', () => {
  it('deduplicates and normalizes enum utilities', () => {
    expect(extractEnum(['l-d-f', 'l-d-f', 'l-center'])).toEqual(['center', 'd-f']);
  });

  it('groups numeric utilities by property prefix', () => {
    expect(extractUnit(['u-w80', 'u-ml-20', 'u-lh1d5', 'u-t150p', 'u-w33p33', 'u-z1n'])).toEqual({
      lh: ['1d5'],
      ml: ['-20'],
      t: ['150p'],
      w: ['33p33', '80'],
      z: ['1n'],
    });
  });

  it('groups color utilities by property prefix', () => {
    expect(extractColor(['u-cfff', 'u-bgc00b51d', 'u-bdceee'])).toEqual({
      bdc: ['eee'],
      bgc: ['00b51d'],
      c: ['fff'],
    });
  });
});
