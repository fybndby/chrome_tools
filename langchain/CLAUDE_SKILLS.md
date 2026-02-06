# Claude Code Skills 使用指南

本项目已安装 myclaude 多代理工作流系统，提供了强大的 AI 辅助开发能力。

## 📦 已安装的模块

### 1. **Dev Workflow** - 核心开发工作流
完整的功能开发流程，包括需求分析、任务分解、并行执行和测试覆盖。

### 2. **Development Essentials** - 基础开发命令
日常开发中常用的命令和工具。

### 3. **OmO** - 多代理编排系统
智能的多代理协调系统，根据任务复杂度自动选择合适的专业代理。

## 🚀 快速开始

### 安装位置
Skills 安装在：`/Users/yekangjie/Documents/chrome_tools/langchain/.claude/`

### 可执行工具
- `codeagent-wrapper`: 位于 `.claude/bin/codeagent-wrapper`
- 已自动添加到 PATH（需要重启 shell 或执行 `source ~/.profile`）

## 📝 可用命令

### 开发工作流命令

#### `/dev` - 完整功能开发
```
/dev "implement user authentication with JWT"
```
**流程**：
1. 需求澄清 - 交互式问答明确范围
2. 深度分析 - 代码库探索和架构决策
3. 生成开发计划 - 结构化任务分解
4. 并行执行 - 多任务并发执行
5. 覆盖率验证 - 强制 ≥90% 测试覆盖
6. 完成总结 - 文件变更和覆盖率统计报告

#### `/code` - 快速代码实现
```
/code "add validation to user input form"
```
快速实现代码功能，无需完整的测试流程。

#### `/debug` - 调试问题
```
/debug "fix authentication error in login page"
```
专注于问题诊断和修复。

#### `/refactor` - 代码重构
```
/refactor "extract duplicate logic into utility function"
```
改进代码结构和可维护性。

#### `/test` - 生成测试
```
/test "add unit tests for authentication module"
```
为现有代码生成测试用例。

#### `/review` - 代码审查
```
/review "review changes in src/auth.ts"
```
对代码进行质量审查。

#### `/optimize` - 性能优化
```
/optimize "improve database query performance"
```
优化代码性能。

#### `/docs` - 生成文档
```
/docs "generate API documentation for authentication module"
```
生成代码文档。

#### `/bugfix` - Bug 修复
```
/bugfix "fix null pointer exception in user service"
```
完整的 bug 修复流程，包括验证。

#### `/ask` - 技术咨询
```
/ask "what's the best way to implement caching?"
```
获取技术建议和最佳实践。

#### `/think` - 深度思考
```
/think "how should we architect the microservices?"
```
进行架构级别的深度思考和分析。

### 多代理编排命令

#### `/omo` - 智能多代理协调
```
/omo "analyze and fix authentication bug"
```

**代理层级**：
| 代理 | 职责 | 后端 |
|------|------|------|
| `oracle` | 技术顾问 | Claude Opus |
| `librarian` | 外部研究 | Claude Sonnet |
| `explore` | 代码库搜索 | OpenCode |
| `develop` | 代码实现 | Codex |
| `frontend-ui-ux-engineer` | UI/UX 专家 | Gemini |
| `document-writer` | 文档编写 | Gemini |

**路由信号**（非固定流程）：
- 代码位置不明确 → `explore`
- 外部库/API → `librarian`
- 高风险/多文件变更 → `oracle`
- 需要实现 → `develop` / `frontend-ui-ux-engineer`

**常见配方**：
- 解释代码：`explore`
- 已知位置的小修复：直接 `develop`
- Bug 修复，位置未知：`explore → develop`
- 跨文件重构：`explore → oracle → develop`
- 外部 API 集成：`explore + librarian → oracle → develop`

## 🛠️ Skills 说明

### codeagent
委托代码执行给 Codex CLI 的技能。

### product-requirements
生成和管理产品需求文档。

### prototype-prompt-generator
生成原型和提示词的技能。

### omo (OmO Multi-Agent Orchestrator)
智能多代理编排系统，根据风险信号将任务路由到专业代理。

## 💡 使用建议

1. **简单任务**：使用 `/code`、`/debug` 或 `/bugfix`
2. **完整功能开发**：使用 `/dev`（包含测试和覆盖率要求）
3. **复杂问题**：使用 `/omo`（自动协调多个专业代理）
4. **性能问题**：使用 `/optimize`
5. **代码审查**：使用 `/review`
6. **技术咨询**：使用 `/ask` 或 `/think`

## 📚 文档

更多详细文档位于 `.claude/docs/` 目录：
- `DEVELOPMENT-COMMANDS.md` - 开发命令详细说明

## 🔧 配置

### 环境变量
确保您已设置相应的 API Keys：
- `ANTHROPIC_API_KEY` - Claude API
- `OPENAI_API_KEY` - OpenAI/Codex API

### 验证安装
```bash
# 检查 codeagent-wrapper 是否可用
which codeagent-wrapper

# 或查看二进制文件
ls -la .claude/bin/codeagent-wrapper
```

如果未找到，请执行：
```bash
source ~/.profile
source ~/.bashrc
```

## 🎯 示例工作流

### 示例 1：实现新功能
```
/dev "add rate limiting to API endpoints with Redis"
```

### 示例 2：修复复杂 Bug
```
/omo "investigate and fix memory leak in user session management"
```

### 示例 3：代码审查和优化
```
/review "review authentication implementation"
/optimize "optimize database queries in user service"
```

### 示例 4：生成文档和测试
```
/test "add comprehensive tests for payment module"
/docs "generate API documentation for payment endpoints"
```

## 📖 相关链接

- [myclaude GitHub](https://github.com/qqzhangyanhua/myclaude)
- [原始项目](https://github.com/cexll/myclaude)

---

**注意**：这些 skills 需要在 Claude Code 环境中使用（如 Cursor IDE 的 Claude 模式）。

