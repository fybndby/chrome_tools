# MCP Servers 配置说明

本项目已配置以下 MCP (Model Context Protocol) 服务器，用于增强 Cursor IDE 的 AI 能力。

## 📡 已配置的 MCP 服务器

### 1. **LangChain Docs** ✨ 新添加
搜索 LangChain 文档、代码示例、API 参考和指南。

**用途**：
- 查找 LangChain 文档和示例
- 理解 LangChain 功能和 API
- 获取实现细节和最佳实践

**可用工具**：
- `SearchDocsByLangChain` - 搜索 LangChain 知识库

**参数**：
- `query` (必填) - 搜索查询
- `version` (可选) - 过滤特定版本（如 'v0.7'）
- `language` (可选) - 过滤语言代码（如 'zh', 'es'），默认 'en'
- `apiReferenceOnly` (可选) - 仅返回 API 参考文档
- `codeOnly` (可选) - 仅返回代码片段

**示例用法**：
```
在 Cursor Chat/Composer 中：
"使用 SearchDocsByLangChain 查找如何创建自定义工具的文档"
"搜索 LangChain 中关于 agent 的中文文档"
```

### 2. **Figma**
与 Figma 设计文件交互，获取设计元素和代码。

**用途**：
- 从 Figma 设计生成代码
- 获取设计系统规则
- 查看设计截图和元数据

### 3. **Chrome DevTools Automation**
自动化 Chrome DevTools，用于调试和测试网页应用。

**用途**：
- 查看浏览器控制台错误
- 自动化浏览器操作
- 网页性能分析

## 🚀 如何使用 MCP 服务器

### 方法 1：在 Chat/Composer 中直接请求
```
"使用 LangChain Docs MCP 搜索如何实现自定义 agent"
```

### 方法 2：使用 @ 提及（如果支持）
```
@LangChain Docs 如何创建带工具的 agent？
```

### 方法 3：在代码上下文中询问
当您编辑 LangChain 相关代码时，AI 会自动使用 LangChain Docs MCP 查找相关信息。

## 🔧 配置文件位置

MCP 配置文件：`~/.cursor/mcp.json`

当前配置：
```json
{
  "mcpServers": {
    "Figma": {
      "url": "https://mcp.figma.com/mcp"
    },
    "Chrome DevTools Automation": {
      "type": "http",
      "url": "https://server.smithery.ai/@SHAY5555-gif/chrome-devtools-mcp-2",
      "headers": {}
    },
    "LangChain Docs": {
      "type": "http",
      "url": "https://docs.langchain.com/mcp",
      "headers": {}
    }
  }
}
```

## ✅ 验证安装

### 1. 重启 Cursor IDE
配置更改后需要重启 Cursor 才能生效。

### 2. 在 Chat 中测试
打开 Cursor Chat (`Cmd + L`) 或 Composer (`Cmd + I`)，尝试：
```
"使用 LangChain Docs 搜索 createAgent 函数的用法"
```

### 3. 查看可用的 MCP 工具
在 Cursor 设置中查看：
- 打开设置（`Cmd + ,`）
- 搜索 "MCP" 或 "Model Context Protocol"
- 应该能看到 LangChain Docs 服务器

## 💡 实用示例

### 示例 1：查找 Agent 文档
```
Prompt: "使用 SearchDocsByLangChain 搜索如何创建带自定义工具的 agent"
```

### 示例 2：查找 API 参考
```
Prompt: "在 LangChain Docs 中搜索 ChatAnthropic 的 API 参考文档"
参数: apiReferenceOnly=true
```

### 示例 3：查找代码示例
```
Prompt: "搜索 LangChain 中使用 tool decorator 的代码示例"
参数: codeOnly=true
```

### 示例 4：查找中文文档
```
Prompt: "搜索 LangChain agent 的中文教程"
参数: language="zh"
```

## 🛠️ 故障排除

### MCP 服务器未出现
1. **重启 Cursor IDE** - 配置更改需要重启
2. **检查配置文件** - 确保 JSON 格式正确：
   ```bash
   cat ~/.cursor/mcp.json | python3 -m json.tool
   ```
3. **查看 Cursor 日志** - 检查是否有 MCP 连接错误

### 搜索没有返回结果
1. 确保查询具体明确
2. 尝试不同的关键词
3. 使用英文查询（默认文档是英文）

### 恢复配置
如果需要恢复之前的配置：
```bash
cp ~/.cursor/mcp.json.backup ~/.cursor/mcp.json
```

## 📚 相关资源

- [LangChain 官方文档](https://docs.langchain.com/)
- [LangChain MCP 服务器](https://docs.langchain.com/mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## 🔄 更新配置

如需添加更多 MCP 服务器，编辑 `~/.cursor/mcp.json`：

```bash
# 备份当前配置
cp ~/.cursor/mcp.json ~/.cursor/mcp.json.backup

# 编辑配置
nano ~/.cursor/mcp.json

# 或使用 VS Code
code ~/.cursor/mcp.json
```

添加新服务器后，重启 Cursor IDE 使配置生效。

---

**注意**：MCP 服务器功能需要 Cursor IDE 的最新版本支持。如果您的版本不支持，请更新到最新版本。

