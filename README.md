# Chrome 扩展程序使用说明

这个项目已经配置为 Chrome 扩展程序，点击扩展程序图标会在新标签页中打开 React 应用。

## 构建扩展程序

```bash
npm run build
```

或者使用 pnpm：

```bash
pnpm build
```

构建完成后，所有文件会输出到 `dist` 目录。

## 加载扩展程序到 Chrome

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压缩的扩展程序"
5. 选择项目的 `dist` 文件夹（不是项目根目录）
6. 扩展程序加载完成！

## 使用扩展程序

- 点击浏览器工具栏中的扩展程序图标
- 会自动打开一个新标签页，显示你的 React 应用

## 开发模式

开发时，你可以：

1. 运行开发服务器：
```bash
npm run dev
```

2. 修改代码后，重新构建：
```bash
npm run build
```

3. 在 Chrome 扩展程序页面刷新扩展程序（点击刷新图标）

## 项目结构

```
chrome_tools_react/
├── dist/              # 构建输出目录（构建后生成）
├── src/               # React 源代码
├── scripts/           # 构建脚本
├── manifest.json      # Chrome 扩展程序配置
├── background.js      # 后台脚本（处理点击事件）
├── icon*.png          # 扩展程序图标
└── vite.config.ts     # Vite 配置（已适配扩展程序）
```

## 工作原理

1. `manifest.json` 定义了扩展程序的基本信息和权限
2. `background.js` 是一个 Service Worker，监听扩展程序图标的点击事件
3. 点击图标时，`background.js` 会打开一个新标签页，显示构建后的 React 应用（`dist/index.html`）
4. React 应用通过 Vite 构建，输出到 `dist` 目录

## 注意事项

- 修改代码后需要重新运行 `npm run build`
- 构建后需要在 Chrome 扩展程序页面刷新扩展程序
- `dist` 目录是构建输出，不要直接修改其中的文件

