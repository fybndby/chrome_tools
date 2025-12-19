# Hello Word Chrome 扩展程序 (React 版本)

使用 React + TypeScript + Vite 构建的 Chrome 扩展程序，点击图标后会在新标签页中显示 "helloword"。

## 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Chrome Extension API** - 扩展程序功能

## 项目结构

```
pngToText/
├── src/                    # React 源代码
│   ├── App.tsx            # 主组件
│   ├── App.css            # 组件样式
│   ├── main.tsx           # React 入口
│   ├── index.html         # HTML 模板
│   └── index.css          # 全局样式
├── dist/                  # 构建输出目录（构建后生成）
├── scripts/               # 构建脚本
│   └── copy-extension-files.js
├── manifest.json          # Chrome 扩展程序配置
├── background.js          # 后台脚本
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
└── package.json           # 项目依赖

```

## 安装依赖

```bash
npm install
```

## 开发模式（本地调试）

### 方式 1：自动监听文件变化（推荐）

启动监听模式，修改代码后自动重新构建：

```bash
npm run dev:extension
```

这个命令会：
- 监听 `src/` 目录下的文件变化
- 自动重新构建项目
- 构建完成后，在 Chrome 扩展程序页面刷新扩展程序即可看到变化

### 方式 2：手动构建

每次修改代码后手动构建：

```bash
npm run build
```

然后在 `chrome://extensions` 页面刷新扩展程序（点击刷新图标）

### 调试技巧

1. **查看扩展程序日志**：
   - 右键点击扩展程序图标 → 检查弹出内容
   - 或在新标签页中按 F12 打开开发者工具

2. **查看后台脚本日志**：
   - 在 `chrome://extensions` 页面
   - 找到你的扩展程序
   - 点击"service worker"或"背景页"链接查看日志

## 构建扩展程序

```bash
npm run build
```

构建完成后，所有文件会输出到 `dist` 目录。

## 加载扩展程序到 Chrome

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压缩的扩展程序"
5. 选择 `pngToText/dist` 文件夹（**注意：是 dist 文件夹，不是项目根目录**）
6. 扩展程序加载完成！

## 使用方法

点击浏览器工具栏中的扩展程序图标，会自动打开一个新标签页显示 "helloword"。

## 开发工作流

1. 修改 `src/` 目录下的代码
2. 运行 `npm run build` 重新构建
3. 在 Chrome 扩展程序页面刷新扩展程序（点击刷新图标）

## 注意事项

- 修改代码后需要重新运行 `npm run build`
- 构建后需要在 Chrome 扩展程序页面刷新扩展程序
- `dist` 目录是构建输出，不要直接修改其中的文件
