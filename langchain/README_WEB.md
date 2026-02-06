# LangChain Agent Web 界面

使用 Ant Design X 构建的 LangChain Agent 聊天界面。

## 功能特性

- 🎨 使用 Ant Design X 组件库，美观的聊天界面
- 💬 支持实时对话
- 🔧 集成 LangChain Agent
- 📱 响应式设计

## 安装依赖

```bash
pnpm install
```

## 配置环境变量

创建 `.env` 文件（用于后端服务）：

```env
ANTHROPIC_API_KEY=your-anthropic-api-key-here
OPENAI_API_KEY=your-openai-api-key-here
```

## 运行

### 开发模式

```bash
# 运行 Web 界面
pnpm dev:web

# 运行后端服务（需要单独实现）
pnpm dev
```

### 构建

```bash
pnpm build:web
```

## 项目结构

```
langchain/
├── src/
│   ├── web/           # Web 前端代码
│   │   ├── App.tsx    # 主应用组件
│   │   ├── main.tsx   # 入口文件
│   │   └── index.css  # 样式文件
│   ├── agent.ts       # LangChain Agent 实现
│   └── index.ts       # 后端服务入口
├── index.html         # HTML 模板
├── vite.config.ts     # Vite 配置
└── package.json
```

## 注意事项

当前实现中，浏览器端无法直接调用 LangChain Agent（因为需要 Node.js 环境）。

**下一步需要：**

1. 创建一个后端 API 服务（Express/Koa 等）
2. 将 LangChain Agent 调用封装为 API 接口
3. 在 `src/web/App.tsx` 中调用后端 API

## 参考文档

- [Ant Design X 文档](https://x.ant.design/docs/react/introduce)
- [LangChain 文档](https://js.langchain.com/)

