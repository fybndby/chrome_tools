import "dotenv/config";
import { runAgent, ModelType } from "./agent";

/**
 * 示例：运行简单的 agent
 */
async function main() {
  // 检查环境变量
  const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
  const hasAnthropicKey = !!process.env.ANTHROPIC_API_KEY;
  const hasDashScopeKey = !!process.env.DASHSCOPE_API_KEY;

  if (!hasOpenAIKey && !hasAnthropicKey && !hasDashScopeKey) {
    console.error("错误：请设置 OPENAI_API_KEY, ANTHROPIC_API_KEY 或 DASHSCOPE_API_KEY 环境变量");
    process.exit(1);
  }

  // 优先级：Qwen > Anthropic > OpenAI
  let modelType: ModelType = "openai";
  let modelDisplayName = "OpenAI GPT";

  if (hasDashScopeKey) {
    modelType = "qwen";
    modelDisplayName = "Aliyun Qwen";
  } else if (hasAnthropicKey) {
    modelType = "anthropic";
    modelDisplayName = "Anthropic Claude";
  }

  console.log(`使用模型: ${modelDisplayName}\n`);

  // 示例问题
  const examples = [
    "计算 123 + 456 的结果",
    "当前时间是什么？",
    "计算 'Hello World' 这个文本有多少个字符？",
    "帮我计算 (10 + 5) * 3 - 8",
  ];

  // 运行第一个示例
  const input = examples[0];
  console.log(`问题: ${input}\n`);

  try {
    const result = await runAgent(input, modelType);
    // 获取最后一条 AI 消息作为结果
    const lastMessage = result.messages[result.messages.length - 1];
    console.log("\n结果:", lastMessage.content);
    console.log("\n完整消息历史:", JSON.stringify(result.messages, null, 2));
  } catch (error: any) {
    console.error("执行错误:", error);

    // 如果是 403 错误，提供更详细的提示
    if (error?.status === 403 || error?.message?.includes("forbidden")) {
      console.error("\n⚠️  错误可能的原因：");
      console.error("1. API Key 可能没有权限访问该模型");
      console.error("2. 模型名称可能不正确");
      console.error("3. API Key 可能已过期或无效");
      console.error("\n💡 建议：");
      console.error("- 检查 .env 文件中的 API Key 是否正确");
      if (modelType === "qwen") {
        console.error("- 访问 https://dashscope.console.aliyun.com/ 确认 API Key 状态");
      } else if (modelType === "anthropic") {
        console.error("- 访问 https://console.anthropic.com/ 确认 API Key 状态");
      }
    }
  }
}

// 运行示例
main().catch(console.error);

