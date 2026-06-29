import { describe, expect, it } from 'vitest';
import { generateLuxCss } from './luxcss-browser';

describe('playground luxcss generator', () => {
  it('generates preview CSS from class names', () => {
    const result = generateLuxCss('l-d-f l-center u-w80 u-w33p33 u-lh1d5 u-bgcfff');

    expect(result.css).toContain('.l-d-f {\n  display: flex;\n}');
    expect(result.css).toContain('.l-center {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}');
    expect(result.css).toContain('.u-w80 {\n  width: 80px;\n}');
    expect(result.css).toContain('.u-w33p33 {\n  width: 33.33%;\n}');
    expect(result.css).toContain('.u-lh1d5 {\n  line-height: 1.5;\n}');
    expect(result.css).toContain('.u-bgcfff {\n  background-color: #fff;\n}');
    expect(result.previewClassName).toContain('l-center');
  });

  it('reports unsupported luxcss-looking class names', () => {
    const result = generateLuxCss('u-gap12 l-made-up u-w10');

    expect(result.unknownClasses).toEqual(['l-made-up', 'u-gap12']);
    expect(result.css).toContain('.u-w10 {\n  width: 10px;\n}');
  });
});
