import './styles.css';
import { generateLuxCss } from './luxcss-browser';

const initialClassNames = 'l-center u-w240 u-h120 u-bgc00b51d u-cfff u-bdrs12 u-fz18';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Missing #app root element');
}

app.innerHTML = `
  <main class="shell">
    <section class="panel editor-panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">luxcss editor</p>
          <h1>Edit class names</h1>
        </div>
        <button class="ghost-button" id="reset-button" type="button">Reset</button>
      </div>

      <p class="hint">
        Type luxcss class names or paste HTML. Supported classes are extracted and rendered live.
      </p>

      <textarea id="class-input" spellcheck="false"></textarea>

      <div class="preset-row" aria-label="Preset examples">
        <button type="button" data-preset="l-center u-w240 u-h120 u-bgc00b51d u-cfff u-bdrs12 u-fz18">Button card</button>
        <button type="button" data-preset="l-d-f u-gap16 u-p20 u-bdcddd u-bdw1">Unknown gap</button>
        <button type="button" data-preset='<div class="l-d-f l-ai-c u-w320 u-h80 u-bgceee u-c333 u-pl24 u-bdrs8">HTML input</div>'>HTML</button>
        <button type="button" data-preset="l-pos-r u-w33p33 u-lh1d5 u-mt-12 u-z1n">Values</button>
      </div>

      <div class="status-card">
        <div><strong id="matched-count">0</strong><span>matched</span></div>
        <div><strong id="enum-count">0</strong><span>enum</span></div>
        <div><strong id="unit-count">0</strong><span>unit</span></div>
        <div><strong id="color-count">0</strong><span>color</span></div>
      </div>

      <div class="unknown-box" id="unknown-box" hidden>
        <strong>Unsupported:</strong>
        <span id="unknown-list"></span>
      </div>
    </section>

    <section class="panel preview-panel">
      <div class="panel-header">
        <div>
          <p class="eyebrow">live result</p>
          <h2>CSS preview</h2>
        </div>
        <button class="ghost-button" id="copy-button" type="button">Copy CSS</button>
      </div>

      <div class="visual-preview">
        <style id="generated-style"></style>
        <div class="preview-stage">
          <div id="preview-node">Preview</div>
        </div>
      </div>

      <pre class="css-output"><code id="css-output"></code></pre>
    </section>
  </main>
`;

const classInput = document.querySelector<HTMLTextAreaElement>('#class-input');
const cssOutput = document.querySelector<HTMLElement>('#css-output');
const generatedStyle = document.querySelector<HTMLStyleElement>('#generated-style');
const previewNode = document.querySelector<HTMLDivElement>('#preview-node');
const matchedCount = document.querySelector<HTMLElement>('#matched-count');
const enumCount = document.querySelector<HTMLElement>('#enum-count');
const unitCount = document.querySelector<HTMLElement>('#unit-count');
const colorCount = document.querySelector<HTMLElement>('#color-count');
const unknownBox = document.querySelector<HTMLElement>('#unknown-box');
const unknownList = document.querySelector<HTMLElement>('#unknown-list');
const resetButton = document.querySelector<HTMLButtonElement>('#reset-button');
const copyButton = document.querySelector<HTMLButtonElement>('#copy-button');

if (!classInput || !cssOutput || !generatedStyle || !previewNode || !matchedCount || !enumCount || !unitCount || !colorCount || !unknownBox || !unknownList || !resetButton || !copyButton) {
  throw new Error('Editor DOM initialization failed');
}

async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

function render(): void {
  const result = generateLuxCss(classInput.value);

  generatedStyle.textContent = result.css;
  cssOutput.textContent = result.css;
  previewNode.className = result.previewClassName;

  matchedCount.textContent = String(result.matchedClasses.length);
  enumCount.textContent = String(result.stats.enumCount);
  unitCount.textContent = String(result.stats.unitCount);
  colorCount.textContent = String(result.stats.colorCount);

  unknownBox.hidden = result.unknownClasses.length === 0;
  unknownList.textContent = result.unknownClasses.join(', ');
}

classInput.value = initialClassNames;
render();

classInput.addEventListener('input', render);
resetButton.addEventListener('click', () => {
  classInput.value = initialClassNames;
  render();
  classInput.focus();
});

copyButton.addEventListener('click', async () => {
  try {
    await copyText(cssOutput.textContent || '');
    copyButton.textContent = 'Copied';
  } catch (error) {
    console.error(error);
    copyButton.textContent = 'Copy failed';
  }

  window.setTimeout(() => {
    copyButton.textContent = 'Copy CSS';
  }, 900);
});

document.querySelectorAll<HTMLButtonElement>('[data-preset]').forEach((button) => {
  button.addEventListener('click', () => {
    classInput.value = button.dataset.preset || '';
    render();
    classInput.focus();
  });
});
