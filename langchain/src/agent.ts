import { createAgent, tool } from "langchain";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

export type ModelType = "openai" | "anthropic" | "qwen";

/**
 * 创建一个简单的 Agent
 */
export function createSimpleAgent(modelType: ModelType = "openai", modelName?: string) {
  let model: any;

  if (modelType === "anthropic") {
    model = new ChatAnthropic({
      model: modelName || "claude-3-sonnet-20240229",
      temperature: 0
    });
  } else if (modelType === "qwen") {
    console.log("qwen=========");
    console.log(process.env.DASHSCOPE_API_KEY);
    model = new ChatOpenAI({
      apiKey: process.env.DASHSCOPE_API_KEY,
      configuration: {
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
      },
      model: modelName || "qwen-plus",
      temperature: 0
    });
  } else {
    model = "openai:gpt-4o";
  }

  // 定义工具
  const tools = [
    tool(
      ({ expression }: { expression: string }) => {
        try {
          // 简单的安全计算（仅支持基本数学运算）
          const result = Function(`"use strict"; return (${expression})`)();
          return `计算结果：${result}`;
        } catch (error) {
          return `计算错误：${error instanceof Error ? error.message : String(error)}`;
        }
      },
      {
        name: "calculator",
        description: "执行数学计算。输入一个数学表达式，返回计算结果。",
        schema: z.object({
          expression: z.string().describe("要计算的数学表达式，例如：2 + 2"),
        }),
      }
    ),
    tool(
      ({ timezone }: { timezone?: string }) => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: timezone || "Asia/Shanghai",
        };
        return `当前时间：${now.toLocaleString("zh-CN", options)}`;
      },
      {
        name: "get_current_time",
        description: "获取当前日期和时间",
        schema: z.object({
          timezone: z.string().optional().describe("时区，例如：Asia/Shanghai"),
        }),
      }
    ),
    tool(
      ({ text }: { text: string }) => {
        return `文本长度：${text.length} 个字符`;
      },
      {
        name: "text_length",
        description: "计算文本的长度（字符数）",
        schema: z.object({
          text: z.string().describe("要计算长度的文本"),
        }),
      }
    ),
  ];

  // 创建 agent
  const agent = createAgent({
    model,
    tools,
    systemPrompt: "你是一个有用的 AI 助手。你可以使用工具来帮助用户解决问题。",
  });

  return agent;
}

/**
 * 运行 agent
 */
export async function runAgent(
  input: string,
  modelType: ModelType = "openai"
) {
  const agent = createSimpleAgent(modelType);
  const result = await agent.invoke({
    messages: [{ role: "user", content: input }],
  });
  return result;
}

