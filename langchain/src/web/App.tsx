import React, { useState, useEffect } from 'react';
import { 
  Bubble, 
  Sender, 
  XProvider, 
  Welcome, 
  Prompts,
  type PromptsProps
} from '@ant-design/x';
import { ConfigProvider, theme, Layout, Space } from 'antd';
import { 
  UserOutlined, 
  RobotOutlined, 
  FireOutlined,
  ReadOutlined,
  HeartOutlined
} from '@ant-design/icons';

const { Content } = Layout;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  loading?: boolean;
}

// 真实 API 调用
async function callAgentAPI(userMessage: string): Promise<string> {
  const response = await fetch('http://localhost:3002/agent/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage }),
  });
  if (!response.ok) throw new Error(`Status: ${response.status}`);
  const data = await response.json();
  return data.response;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  // Suggested prompts for the Welcome screen
  const items: PromptsProps['items'] = [
    {
      key: '1',
      icon: <FireOutlined style={{ color: '#ff4d4f' }} />,
      label: 'Analyze my codebase',
      description: 'Scan for bugs and optimizations',
    },
    {
      key: '2',
      icon: <ReadOutlined style={{ color: '#1890ff' }} />,
      label: 'Explain this concept',
      description: 'Deep dive into technical topics',
    },
    {
      key: '3',
      icon: <HeartOutlined style={{ color: '#eb2f96' }} />,
      label: 'Refactor this function',
      description: 'Improve readability and performance',
    },
  ];

  const handleSend = async (content: string) => {
    if (!content.trim() || loading) return;

    const newMsg: Message = { 
      id: Date.now().toString(), 
      role: 'user', 
      content: content 
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setLoading(true);

    // Placeholder for assistant response
    const assistantMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { 
      id: assistantMsgId, 
      role: 'assistant', 
      content: '', 
      loading: true 
    }]);

    try {
      const response = await callAgentAPI(content);
      
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMsgId 
          ? { ...msg, content: response, loading: false }
          : msg
      ));
    } catch (error: any) {
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMsgId 
          ? { ...msg, content: `Error: ${error.message}`, loading: false }
          : msg
      ));
    } finally {
      setLoading(false);
    }
  };

  const onItemClick: PromptsProps['onItemClick'] = (info) => {
    handleSend(info.data.label as string);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <XProvider>
        <Layout style={{ height: '100vh', background: '#000' }}>
          <Content style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            maxWidth: '1000px', 
            margin: '0 auto', 
            width: '100%',
            padding: '24px'
          }}>
            
            {/* Chat Area */}
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '24px' }}>
              {messages.length === 0 ? (
                <div style={{ marginTop: '10vh' }}>
                  <Welcome
                    icon="https://mdn.alipayobjects.com/huamei_iwk9di/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
                    title="Hello, I'm Nexus AI"
                    description="I can help you analyze code, write documentation, and solve complex problems."
                    extra={
                      <Space direction="vertical" style={{ width: '100%', marginTop: 24 }}>
                        <Prompts 
                          title="Get Started" 
                          items={items} 
                          onItemClick={onItemClick} 
                        />
                      </Space>
                    }
                  />
                </div>
              ) : (
                <Bubble.List 
                  items={messages.map(msg => ({
                    key: msg.id,
                    role: msg.role,
                    content: msg.content,
                    loading: msg.loading,
                    avatar: (
                      <Avatar 
                        icon={msg.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
                        style={{ backgroundColor: msg.role === 'user' ? '#333' : '#1677ff' }}
                      />
                    ),
                    variant: msg.role === 'user' ? 'shadow' : 'filled',
                  }))} 
                />
              )}
            </div>

            {/* Input Area */}
            <Sender
              value={inputValue}
              onChange={setInputValue}
              onSubmit={() => handleSend(inputValue)}
              loading={loading}
              placeholder="Ask me anything..."
            />
          </Content>
        </Layout>
      </XProvider>
    </ConfigProvider>
  );
};

export default App;
