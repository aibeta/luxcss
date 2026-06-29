# luxcss utility reference

This file is generated from `src/base.js`.

## Numeric utilities

Numeric utilities use the form `u-<prefix><value>`.

Value syntax:

| Syntax | Example | Meaning |
| --- | --- | --- |
| integer | `u-w80` | default unit, currently px |
| negative integer | `u-ml-20` | negative default-unit value |
| decimal | `u-lh1d5` | `1.5`, unitless |
| percent | `u-w50p` | `50%` |
| percent decimal | `u-w33p33` | `33.33%` |
| unitless | `u-z1n` | `1` |

| Class pattern | CSS property |
| --- | --- |
| u-b<value> | `bottom` |
| u-bdblrs<value> | `border-bottom-left-radius` |
| u-bdbrrs<value> | `border-bottom-right-radius` |
| u-bdbw<value> | `border-bottom-width` |
| u-bdlw<value> | `border-left-width` |
| u-bdrs<value> | `border-radius` |
| u-bdrw<value> | `border-right-width` |
| u-bdtlrs<value> | `border-top-left-radius` |
| u-bdtrrs<value> | `border-top-right-radius` |
| u-bdtw<value> | `border-top-width` |
| u-bdw<value> | `border-width` |
| u-fw<value> | `font-weight` |
| u-fx<value> | `flex` |
| u-fz<value> | `font-size` |
| u-h<value> | `height` |
| u-l<value> | `left` |
| u-lh<value> | `line-height` |
| u-mah<value> | `max-height` |
| u-maw<value> | `max-width` |
| u-mb<value> | `margin-bottom` |
| u-mih<value> | `min-height` |
| u-miw<value> | `min-width` |
| u-ml<value> | `margin-left` |
| u-mr<value> | `margin-right` |
| u-mt<value> | `margin-top` |
| u-op<value> | `opacity` |
| u-pb<value> | `padding-bottom` |
| u-pl<value> | `padding-left` |
| u-pr<value> | `padding-right` |
| u-pt<value> | `padding-top` |
| u-r<value> | `right` |
| u-t<value> | `top` |
| u-ti<value> | `text-indent` |
| u-w<value> | `width` |
| u-z<value> | `z-index` |

## Color utilities

Color utilities use the form `u-<prefix><hex>`. Hex values support 3 or 6 digits without `#`.

| Class pattern | CSS property |
| --- | --- |
| u-bdbc<hex> | `border-bottom-color` |
| u-bdc<hex> | `border-color` |
| u-bdlc<hex> | `border-left-color` |
| u-bdrc<hex> | `border-right-color` |
| u-bdtc<hex> | `border-top-color` |
| u-bgc<hex> | `background-color` |
| u-c<hex> | `color` |

## Enum utilities

Enum utilities use the form `l-<token>` and map to fixed declarations.

| Class | CSS |
| --- | --- |
| l-a | `vertical-align: top;` |
| l-ac-c | `align-content: center;` |
| l-ac-fe | `align-content: flex-end;` |
| l-ac-fs | `align-content: flex-start;` |
| l-ac-s | `align-content: stretch;` |
| l-ac-sa | `align-content: space-around;` |
| l-ac-sb | `align-content: space-between;` |
| l-ai-b | `align-items: baseline;` |
| l-ai-c | `align-items: center;` |
| l-ai-fe | `align-items: flex-end;` |
| l-ai-fs | `align-items: flex-start;` |
| l-ai-s | `align-items: stretch;` |
| l-animdel | `animation-delay: time;` |
| l-animdir | `animation-direction: normal;` |
| l-animdir-a | `animation-direction: alternate;` |
| l-animdir-ar | `animation-direction: alternate-reverse;` |
| l-animdir-n | `animation-direction: normal;` |
| l-animdir-r | `animation-direction: reverse;` |
| l-animdur | `animation-duration: 0s;` |
| l-animfm | `animation-fill-mode: both;` |
| l-animfm-b | `animation-fill-mode: backwards;` |
| l-animfm-f | `animation-fill-mode: forwards;` |
| l-animic | `animation-iteration-count: 1;` |
| l-animic-i | `animation-iteration-count: infinite;` |
| l-animn | `animation-name: none;` |
| l-animps | `animation-play-state: running;` |
| l-animps-p | `animation-play-state: paused;` |
| l-animps-r | `animation-play-state: running;` |
| l-animtf | `animation-timing-function: linear;` |
| l-animtf-e | `animation-timing-function: ease;` |
| l-animtf-ei | `animation-timing-function: ease-in;` |
| l-animtf-eio | `animation-timing-function: ease-in-out;` |
| l-animtf-eo | `animation-timing-function: ease-out;` |
| l-animtf-l | `animation-timing-function: linear;` |
| l-as-a | `align-self: auto;` |
| l-as-b | `align-self: baseline;` |
| l-as-c | `align-self: center;` |
| l-as-fe | `align-self: flex-end;` |
| l-as-fs | `align-self: flex-start;` |
| l-as-s | `align-self: stretch;` |
| l-b-a | `bottom: auto;` |
| l-bd-n | `border: none;` |
| l-bdb-n | `border-bottom: none;` |
| l-bdbc-t | `border-bottom-color: transparent;` |
| l-bdbi-n | `border-bottom-image: none;` |
| l-bdbk | `border-break: close;` |
| l-bdbk-c | `border-break: close;` |
| l-bdbli-c | `border-bottom-left-image: continue;` |
| l-bdbli-n | `border-bottom-left-image: none;` |
| l-bdbri-c | `border-bottom-right-image: continue;` |
| l-bdbri-n | `border-bottom-right-image: none;` |
| l-bdbs-n | `border-bottom-style: none;` |
| l-bdbs-s | `border-bottom-style: solid;` |
| l-bdc-t | `border-color: transparent;` |
| l-bdci-c | `border-corner-image: continue;` |
| l-bdci-n | `border-corner-image: none;` |
| l-bdcl-c | `border-collapse: collapse;` |
| l-bdcl-s | `border-collapse: separate;` |
| l-bdf | `border-fit: repeat;` |
| l-bdf-c | `border-fit: clip;` |
| l-bdf-of | `border-fit: overflow;` |
| l-bdf-ow | `border-fit: overwrite;` |
| l-bdf-r | `border-fit: repeat;` |
| l-bdf-sc | `border-fit: scale;` |
| l-bdf-sp | `border-fit: space;` |
| l-bdf-st | `border-fit: stretch;` |
| l-bdi-n | `border-image: none;` |
| l-bdl-n | `border-left: none;` |
| l-bdlc-t | `border-left-color: transparent;` |
| l-bdlen-a | `border-length: auto;` |
| l-bdli-n | `border-left-image: none;` |
| l-bdls-n | `border-left-style: none;` |
| l-bdls-s | `border-left-style: solid;` |
| l-bdr-n | `border-right: none;` |
| l-bdrc-t | `border-right-color: transparent;` |
| l-bdri-n | `border-right-image: none;` |
| l-bdrs-s | `border-right-style: solid;` |
| l-bdrst-n | `border-right-style: none;` |
| l-bds-db | `border-style: double;` |
| l-bds-ds | `border-style: dashed;` |
| l-bds-dt | `border-style: dotted;` |
| l-bds-dtds | `border-style: dot-dash;` |
| l-bds-dtdtds | `border-style: dot-dot-dash;` |
| l-bds-g | `border-style: groove;` |
| l-bds-h | `border-style: hidden;` |
| l-bds-i | `border-style: inset;` |
| l-bds-n | `border-style: none;` |
| l-bds-o | `border-style: outset;` |
| l-bds-r | `border-style: ridge;` |
| l-bds-s | `border-style: solid;` |
| l-bds-w | `border-style: wave;` |
| l-bdt-n | `border-top: none;` |
| l-bdtc-t | `border-top-color: transparent;` |
| l-bdti-n | `border-top-image: none;` |
| l-bdtli-c | `border-top-left-image: continue;` |
| l-bdtli-n | `border-top-left-image: none;` |
| l-bdtri-c | `border-top-right-image: continue;` |
| l-bdtri-n | `border-top-right-image: none;` |
| l-bdts-n | `border-top-style: none;` |
| l-bdts-s | `border-top-style: solid;` |
| l-bfv-h | `backface-visibility: hidden;` |
| l-bfv-v | `backface-visibility: visible;` |
| l-bg-n | `background: none;` |
| l-bga-f | `background-attachment: fixed;` |
| l-bga-s | `background-attachment: scroll;` |
| l-bgbk-bb | `background-break: bounding-box;` |
| l-bgbk-c | `background-break: continuous;` |
| l-bgbk-eb | `background-break: each-box;` |
| l-bgc-t | `background-color: transparent;` |
| l-bgcp | `background-clip: padding-box;` |
| l-bgcp-bb | `background-clip: border-box;` |
| l-bgcp-cb | `background-clip: content-box;` |
| l-bgcp-nc | `background-clip: no-clip;` |
| l-bgcp-pb | `background-clip: padding-box;` |
| l-bgi-n | `background-image: none;` |
| l-bgo-bb | `background-origin: border-box;` |
| l-bgo-cb | `background-origin: content-box;` |
| l-bgo-pb | `background-origin: padding-box;` |
| l-bgr-n | `background-repeat: no-repeat;` |
| l-bgr-rd | `background-repeat: round;` |
| l-bgr-sp | `background-repeat: space;` |
| l-bgr-x | `background-repeat: repeat-x;` |
| l-bgr-y | `background-repeat: repeat-y;` |
| l-bgsz-a | `background-size: auto;` |
| l-bgsz-ct | `background-size: contain;` |
| l-bgsz-cv | `background-size: cover;` |
| l-bxsh-n | `box-shadow: none;` |
| l-bxz | `box-sizing: border-box;` |
| l-bxz-bb | `box-sizing: border-box;` |
| l-bxz-cb | `box-sizing: content-box;` |
| l-center | `display: flex; align-items: center; justify-content: center;` |
| l-cl | `clear: both;` |
| l-cl-b | `clear: both;` |
| l-cl-l | `clear: left;` |
| l-cl-n | `clear: none;` |
| l-cl-r | `clear: right;` |
| l-cp-a | `clip: auto;` |
| l-cps-b | `caption-side: bottom;` |
| l-cps-t | `caption-side: top;` |
| l-cur-a | `cursor: auto;` |
| l-cur-c | `cursor: crosshair;` |
| l-cur-d | `cursor: default;` |
| l-cur-ha | `cursor: hand;` |
| l-cur-he | `cursor: help;` |
| l-cur-m | `cursor: move;` |
| l-cur-p | `cursor: pointer;` |
| l-cur-t | `cursor: text;` |
| l-d | `display: block;` |
| l-d-b | `display: block;` |
| l-d-cp | `display: compact;` |
| l-d-f | `display: flex;` |
| l-d-i | `display: inline;` |
| l-d-ib | `display: inline-block;` |
| l-d-if | `display: inline-flex;` |
| l-d-itb | `display: inline-table;` |
| l-d-li | `display: list-item;` |
| l-d-n | `display: none;` |
| l-d-rb | `display: ruby;` |
| l-d-rbb | `display: ruby-base;` |
| l-d-rbbg | `display: ruby-base-group;` |
| l-d-rbt | `display: ruby-text;` |
| l-d-rbtg | `display: ruby-text-group;` |
| l-d-ri | `display: run-in;` |
| l-d-tb | `display: table;` |
| l-d-tbc | `display: table-cell;` |
| l-d-tbcl | `display: table-column;` |
| l-d-tbclg | `display: table-column-group;` |
| l-d-tbcp | `display: table-caption;` |
| l-d-tbfg | `display: table-footer-group;` |
| l-d-tbhg | `display: table-header-group;` |
| l-d-tbr | `display: table-row;` |
| l-d-tbrg | `display: table-row-group;` |
| l-ec-h | `empty-cells: hide;` |
| l-ec-s | `empty-cells: show;` |
| l-fef-eb | `font-effect: emboss;` |
| l-fef-eg | `font-effect: engrave;` |
| l-fef-n | `font-effect: none;` |
| l-fef-o | `font-effect: outline;` |
| l-femp-a | `font-emphasize-position: after;` |
| l-femp-b | `font-emphasize-position: before;` |
| l-fems-ac | `font-emphasize-style: accent;` |
| l-fems-c | `font-emphasize-style: circle;` |
| l-fems-ds | `font-emphasize-style: disc;` |
| l-fems-dt | `font-emphasize-style: dot;` |
| l-fems-n | `font-emphasize-style: none;` |
| l-ff-c | `font-family: cursive;` |
| l-ff-f | `font-family: fantasy;` |
| l-ff-m | `font-family: monospace;` |
| l-ff-s | `font-family: serif;` |
| l-ff-ss | `font-family: sans-serif;` |
| l-fl | `float: left;` |
| l-fl-l | `float: left;` |
| l-fl-n | `float: none;` |
| l-fl-r | `float: right;` |
| l-fs-i | `font-style: italic;` |
| l-fs-n | `font-style: normal;` |
| l-fs-o | `font-style: oblique;` |
| l-fsm-a | `font-smooth: auto;` |
| l-fsm-aw | `font-smooth: always;` |
| l-fsm-n | `font-smooth: never;` |
| l-fst-c | `font-stretch: condensed;` |
| l-fst-e | `font-stretch: expanded;` |
| l-fst-ec | `font-stretch: extra-condensed;` |
| l-fst-ee | `font-stretch: extra-expanded;` |
| l-fst-n | `font-stretch: normal;` |
| l-fst-sc | `font-stretch: semi-condensed;` |
| l-fst-se | `font-stretch: semi-expanded;` |
| l-fst-uc | `font-stretch: ultra-condensed;` |
| l-fst-ue | `font-stretch: ultra-expanded;` |
| l-fv-n | `font-variant: normal;` |
| l-fv-sc | `font-variant: small-caps;` |
| l-fw-b | `font-weight: bold;` |
| l-fw-br | `font-weight: bolder;` |
| l-fw-lr | `font-weight: lighter;` |
| l-fw-n | `font-weight: normal;` |
| l-fxd-c | `flex-direction: column;` |
| l-fxd-cr | `flex-direction: column-reverse;` |
| l-fxd-r | `flex-direction: row;` |
| l-fxd-rr | `flex-direction: row-reverse;` |
| l-fxw-n | `flex-wrap: nowrap;` |
| l-fxw-w | `flex-wrap: wrap;` |
| l-fxw-wr | `flex-wrap: wrap-reverse;` |
| l-fza-n | `font-size-adjust: none;` |
| l-h-a | `height: auto;` |
| l-jc-c | `justify-content: center;` |
| l-jc-fe | `justify-content: flex-end;` |
| l-jc-fs | `justify-content: flex-start;` |
| l-jc-sa | `justify-content: space-around;` |
| l-jc-sb | `justify-content: space-between;` |
| l-l-a | `left: auto;` |
| l-lis-n | `list-style: none;` |
| l-lisi-n | `list-style-image: none;` |
| l-lisp-i | `list-style-position: inside;` |
| l-lisp-o | `list-style-position: outside;` |
| l-list-c | `list-style-type: circle;` |
| l-list-d | `list-style-type: disc;` |
| l-list-dc | `list-style-type: decimal;` |
| l-list-dclz | `list-style-type: decimal-leading-zero;` |
| l-list-lr | `list-style-type: lower-roman;` |
| l-list-n | `list-style-type: none;` |
| l-list-s | `list-style-type: square;` |
| l-list-ur | `list-style-type: upper-roman;` |
| l-lts-n | `letter-spacing: normal;` |
| l-m-a | `margin: auto;` |
| l-mah-n | `max-height: none;` |
| l-mar | `max-resolution: res;` |
| l-maw-n | `max-width: none;` |
| l-mb-a | `margin-bottom: auto;` |
| l-mir | `min-resolution: res;` |
| l-ml-a | `margin-left: auto;` |
| l-mr-a | `margin-right: auto;` |
| l-mt-a | `margin-top: auto;` |
| l-ol-n | `outline: none;` |
| l-olc | `outline-color: #000;` |
| l-olc-i | `outline-color: invert;` |
| l-ols-db | `outline-style: double;` |
| l-ols-ds | `outline-style: dashed;` |
| l-ols-dt | `outline-style: dotted;` |
| l-ols-g | `outline-style: groove;` |
| l-ols-i | `outline-style: inset;` |
| l-ols-n | `outline-style: none;` |
| l-ols-o | `outline-style: outset;` |
| l-ols-r | `outline-style: ridge;` |
| l-ols-s | `outline-style: solid;` |
| l-olw-m | `outline-width: medium;` |
| l-olw-tc | `outline-width: thick;` |
| l-olw-tn | `outline-width: thin;` |
| l-ori-l | `orientation: landscape;` |
| l-ori-p | `orientation: portrait;` |
| l-ov | `overflow: hidden;` |
| l-ov-a | `overflow: auto;` |
| l-ov-h | `overflow: hidden;` |
| l-ov-s | `overflow: scroll;` |
| l-ov-v | `overflow: visible;` |
| l-ovs | `overflow-style: scrollbar;` |
| l-ovs-a | `overflow-style: auto;` |
| l-ovs-m | `overflow-style: move;` |
| l-ovs-mq | `overflow-style: marquee;` |
| l-ovs-p | `overflow-style: panner;` |
| l-ovs-s | `overflow-style: scrollbar;` |
| l-ovx | `overflow-x: hidden;` |
| l-ovx-a | `overflow-x: auto;` |
| l-ovx-h | `overflow-x: hidden;` |
| l-ovx-s | `overflow-x: scroll;` |
| l-ovx-v | `overflow-x: visible;` |
| l-ovy | `overflow-y: hidden;` |
| l-ovy-a | `overflow-y: auto;` |
| l-ovy-h | `overflow-y: hidden;` |
| l-ovy-s | `overflow-y: scroll;` |
| l-ovy-v | `overflow-y: visible;` |
| l-pos | `position: relative;` |
| l-pos-a | `position: absolute;` |
| l-pos-f | `position: fixed;` |
| l-pos-r | `position: relative;` |
| l-pos-s | `position: static;` |
| l-q-n | `quotes: none;` |
| l-r-a | `right: auto;` |
| l-rsz | `vresize: vertical;` |
| l-rsz-b | `resize: both;` |
| l-rsz-h | `resize: horizontal;` |
| l-rsz-n | `resize: none;` |
| l-t-a | `top: auto;` |
| l-ta | `text-align: left;` |
| l-ta-c | `text-align: center;` |
| l-ta-j | `text-align: justify;` |
| l-ta-l | `text-align: left;` |
| l-ta-r | `text-align: right;` |
| l-tal-a | `text-align-last: auto;` |
| l-tal-c | `text-align-last: center;` |
| l-tal-l | `text-align-last: left;` |
| l-tal-r | `text-align-last: right;` |
| l-tbl-a | `table-layout: auto;` |
| l-tbl-f | `table-layout: fixed;` |
| l-td | `text-decoration: none;` |
| l-td-l | `text-decoration: line-through;` |
| l-td-n | `text-decoration: none;` |
| l-td-o | `text-decoration: overline;` |
| l-td-u | `text-decoration: underline;` |
| l-te-a | `text-emphasis: after;` |
| l-te-ac | `text-emphasis: accent;` |
| l-te-b | `text-emphasis: before;` |
| l-te-c | `text-emphasis: circle;` |
| l-te-ds | `text-emphasis: disc;` |
| l-te-dt | `text-emphasis: dot;` |
| l-te-n | `text-emphasis: none;` |
| l-th-a | `text-height: auto;` |
| l-th-f | `text-height: font-size;` |
| l-th-m | `text-height: max-size;` |
| l-th-t | `text-height: text-size;` |
| l-tj-a | `text-justify: auto;` |
| l-tj-d | `text-justify: distribute;` |
| l-tj-ic | `text-justify: inter-cluster;` |
| l-tj-ii | `text-justify: inter-ideograph;` |
| l-tj-iw | `text-justify: inter-word;` |
| l-tj-k | `text-justify: kashida;` |
| l-tj-t | `text-justify: tibetan;` |
| l-to-n | `text-outline: none;` |
| l-tov-c | `text-overflow: clip;` |
| l-tov-e | `text-overflow: ellipsis;` |
| l-tr-n | `text-replace: none;` |
| l-tsh-n | `text-shadow: none;` |
| l-tt | `text-transform: uppercase;` |
| l-tt-c | `text-transform: capitalize;` |
| l-tt-l | `text-transform: lowercase;` |
| l-tt-n | `text-transform: none;` |
| l-tt-u | `text-transform: uppercase;` |
| l-tw-n | `text-wrap: normal;` |
| l-tw-no | `text-wrap: none;` |
| l-tw-s | `text-wrap: suppress;` |
| l-tw-u | `text-wrap: unrestricted;` |
| l-v | `visibility: hidden;` |
| l-v-c | `visibility: collapse;` |
| l-v-h | `visibility: hidden;` |
| l-v-v | `visibility: visible;` |
| l-va-b | `vertical-align: bottom;` |
| l-va-bl | `vertical-align: baseline;` |
| l-va-m | `vertical-align: middle;` |
| l-va-sub | `vertical-align: sub;` |
| l-va-sup | `vertical-align: super;` |
| l-va-t | `vertical-align: top;` |
| l-va-tb | `vertical-align: text-bottom;` |
| l-va-tt | `vertical-align: text-top;` |
| l-w-a | `width: auto;` |
| l-whs-n | `white-space: normal;` |
| l-whs-nw | `white-space: nowrap;` |
| l-whs-p | `white-space: pre;` |
| l-whs-pl | `white-space: pre-line;` |
| l-whs-pw | `white-space: pre-wrap;` |
| l-whsc-ba | `white-space-collapse: break-all;` |
| l-whsc-bs | `white-space-collapse: break-strict;` |
| l-whsc-k | `white-space-collapse: keep-all;` |
| l-whsc-l | `white-space-collapse: loose;` |
| l-whsc-n | `white-space-collapse: normal;` |
| l-wm | `writing-mode: lr-tb;` |
| l-wm-btl | `writing-mode: bt-lr;` |
| l-wm-btr | `writing-mode: bt-rl;` |
| l-wm-lrb | `writing-mode: lr-bt;` |
| l-wm-lrt | `writing-mode: lr-tb;` |
| l-wm-rlb | `writing-mode: rl-bt;` |
| l-wm-rlt | `writing-mode: rl-tb;` |
| l-wm-tbl | `writing-mode: tb-lr;` |
| l-wm-tbr | `writing-mode: tb-rl;` |
| l-wob-ba | `word-break: break-all;` |
| l-wob-k | `word-break: keep-all;` |
| l-wob-n | `word-break: normal;` |
| l-wow-b | `word-wrap: break-word;` |
| l-wow-n | `word-wrap: none;` |
| l-wow-nm | `word-wrap: normal;` |
| l-wow-s | `word-wrap: suppress;` |
| l-wow-u | `word-wrap: unrestricted;` |
| l-z-a | `z-index: auto;` |
| l-zm | `zoom: 1;` |
