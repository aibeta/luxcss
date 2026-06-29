import { describe, expect, it } from 'vitest';
import { makeLessTemplate } from './sass.template';

describe('makeLessTemplate', () => {
  it('generates enum rules with the correct declarations', () => {
    const css = makeLessTemplate(['d-f', 'center'], {}, {});

    expect(css).toContain('.l-d-f {\n  display: flex;\n}');
    expect(css).toContain('.l-center {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}');
  });

  it('generates numeric and color rules', () => {
    const css = makeLessTemplate([], {
      lh: ['1d5'],
      ml: ['-20'],
      t: ['150p'],
      w: ['33p33', '80'],
      z: ['1n'],
    }, {
      bgc: ['00b51d'],
      c: ['fff'],
    });

    expect(css).toContain('.u-lh1d5 {\n  line-height: 1.5;\n}');
    expect(css).toContain('.u-ml-20 {\n  margin-left: -20px;\n}');
    expect(css).toContain('.u-t150p {\n  top: 150%;\n}');
    expect(css).toContain('.u-w33p33 {\n  width: 33.33%;\n}');
    expect(css).toContain('.u-w80 {\n  width: 80px;\n}');
    expect(css).toContain('.u-z1n {\n  z-index: 1;\n}');
    expect(css).toContain('.u-bgc00b51d {\n  background-color: #00b51d;\n}');
    expect(css).toContain('.u-cfff {\n  color: #fff;\n}');
  });
});
