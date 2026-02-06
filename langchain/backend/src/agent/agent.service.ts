import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import { createAgent, tool } from 'langchain';
import { z } from 'zod';

@Injectable()
export class AgentService implements OnModuleInit {
  private agent: any;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const apiKey = this.configService.get<string>('DASHSCOPE_API_KEY');
    
    const model = new ChatOpenAI({
      apiKey: apiKey,
      configuration: {
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
      },
      model: "qwen-plus",
      temperature: 0
    });

    const tools = [
      tool(
        ({ expression }: { expression: string }) => {
          try {
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
          description: "获取当前日期 and 时间",
          schema: z.object({
            timezone: z.string().optional().describe("时区，例如：Asia/Shanghai"),
          }),
        }
      ),
    ];

    this.agent = createAgent({
      model,
      tools,
      systemPrompt: "你是一个有用的 AI 助手。你可以使用工具来帮助用户解决问题。请使用中文回答。",
    });
  }

  async chat(message: string) {
    const result = await this.agent.invoke({
      messages: [{ role: "user", content: message }],
    });
    // 返回最后一条 AI 消息内容
    return result.messages[result.messages.length - 1].content;
  }
}
