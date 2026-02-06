// API 调用封装
export interface ChatRequest {
  message: string;
  useAnthropic?: boolean;
}

export interface ChatResponse {
  content: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

// 由于浏览器环境无法直接使用 Node.js 的 dotenv 和 langchain
// 我们需要创建一个后端 API 服务
// 这里先提供一个占位实现
export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  // TODO: 实现后端 API 调用
  // 当前返回模拟数据
  throw new Error('请实现后端 API 服务');
}

