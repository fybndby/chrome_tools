# LangChain Agent 示例

这是一个使用 LangChain 实现的简单 Agent 示例。

## 功能特性

- 支持使用 Anthropic Claude 或 OpenAI GPT 模型
- 内置多个实用工具：
  - 计算器：执行数学计算
  - 获取当前时间
  - 计算文本长度
- 支持工具调用和链式推理

## 安装依赖

```bash
pnpm install
```

## 配置环境变量

在使用前，需要设置 API Key（至少设置一个）。有两种方式：

### 方式一：使用 .env 文件（推荐）

1. 复制 `.env.example` 文件为 `.env`：
```bash
cp .env.example .env
```

2. 编辑 `.env` 文件，填入你的 API Key：
```env
# OpenAI API Key
OPENAI_API_KEY=your-openai-api-key-here

# Anthropic API Key
ANTHROPIC_API_KEY=your-anthropic-api-key-here
```

### 方式二：直接设置环境变量

```bash
# OpenAI API Key
export OPENAI_API_KEY="your-openai-api-key"

# 或 Anthropic API Key
export ANTHROPIC_API_KEY="your-anthropic-api-key"
```

**注意**：至少需要设置一个 API Key。优先使用 Anthropic，如果没有则使用 OpenAI。

## 运行示例

```bash
# 开发模式（使用 tsx）
pnpm dev

# 或编译后运行
pnpm build
pnpm start
```

## 使用示例

Agent 会自动选择可用的模型（优先使用 Anthropic）。你可以修改 `src/index.ts` 中的示例问题来测试不同的功能。

### 示例问题

- "计算 123 + 456 的结果"
- "当前时间是什么？"
- "计算 'Hello World' 这个文本有多少个字符？"
- "帮我计算 (10 + 5) * 3 - 8"

## 代码结构

- `src/agent.ts` - Agent 核心实现
- `src/index.ts` - 示例运行入口

## 扩展工具

你可以在 `src/agent.ts` 中的 `tools` 数组中添加更多工具。每个工具需要：

1. 定义工具名称和描述
2. 使用 Zod schema 定义输入参数
3. 实现工具的执行函数

