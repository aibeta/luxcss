
### luxcss

### luxcss 是什么？

luxcss 是一个样式生成工具，它可以监听你在 html/wxml/vue/jsx 文件中写的类名，并且自动生成该类名所代表的样式。简单地说，你只需要在页面写上你需要的类名，luxcss 会自动生成你需要的样式。

### 使用说明

- 启用服务，可编辑 src/example/index.html 查看示例

```
$ git clone https://github.com/aibeta/luxcss.git
$ cd luxcss
$ npm install
$ npm start
```

- 自定义，编辑 src/config.js 然后重启服务

```
// 示例配置 1
const config = {
  fileUnit: 'px', // 自定义单位，如 rpx/em/rem/vw
  fileUnitDevidend: 1, // 自定义单位的被除数，如 3.75/100
  fileSrcPath: [ // 配置需要监听的文件
    `${__dirname}/example/index.html`
  ],
  fileLessPath: `${__dirname}/example/lux.less`, // 可选, 存在则输出 less 源文件
  fileDistPath: `${__dirname}/example/lux.css`, // 配置生成的 css 文件路径
  compress: false,
};

// 示例配置 2
const config = {
  fileUnit: 'rpx',
  fileUnitDevidend: 1,
  fileSrcPath: [ // 使用 [name]/[name] 可以匹配所有 ~/pages/ 路径下的文件
    '/Users/dayu/Desktop/mpvue/src/pages/[name]/[name].vue',
    '/Users/dayu/Desktop/mpvue/src/components/[name].vue',
    '/Users/dayu/Desktop/mpvue/src/App.vue'],
  fileDistPath: '/Users/dayu/Desktop/mpvue/src/style/lux.css',
  compress: false,
};
```

### 规则说明

#### 可以自定义单位的规则

- 🌰.lux-w100 { width: 100px; }
- 🌰.lux-l-100 { left: -100px; }
- 🌰.luxi-fx1 { flex: 1 }
- 🌰.luxd-op70 { opacity: 0.7 }
- 🌰.luxp-mah100 { max-height: 100%; }

```
fx: 'flex',
fw: 'font-weight',
z: 'z-index',
op: 'opacity',
t: 'top',
b: 'bottom',
l: 'left',
r: 'right',
w: 'width',
h: 'height',
lh: 'line-height',
mih: 'min-height',
mah: 'max-height',
miw: 'min-width',
maw: 'max-width',
bdrs: 'border-radius',
mt: 'margin-top',
mr: 'margin-right',
mb: 'margin-bottom',
ml: 'margin-left',
pt: 'padding-top',
pr: 'padding-right',
pb: 'padding-bottom',
pl: 'padding-left',
fz: 'font-size',
bdw: 'border-width',
bdtw: 'border-top-width',
bdbw: 'border-bottom-width',
bdlw: 'border-left-width',
bdrw: 'border-right-width',
bdtrrs: 'border-top-right-radius',
bdtlrs: 'border-top-left-radius',
bdbrrs: 'border-bottom-right-radius',
bdblrs: 'border-bottom-left-radius',
```

#### 可以自定义颜色的规则

- 🌰.lux-cfff { color: #fff;}
- 🌰.lux-bgc00ffee { background-color: #00ffee; }

```
c: 'color',
bgc: 'background-color',
bdc: 'border-color',
bdtc: 'border-top-color',
bdbc: 'border-bottom-color',
bdlc: 'border-left-color',
bdrc: 'border-right-color',
```

#### 自定义规则 (可以在 src/base.js userValue 里添加)

- 🌰.lux-center { display: flex; align-items: center;justify-content: center; }

```
center: 'display: flex; align-items: center;justify-content: center;',
'bdts-s': 'border-top-style: solid;',
'bdbs-s': 'border-bottom-style: solid;',
'bdls-s': 'border-left-style: solid;',
'bdrs-s': 'border-right-style: solid;',
```

#### 其他固定规则 (可以查看 src/cheat 下的文件)

- 也可以直接查看 https://docs.emmet.io/cheat-sheet/
