import { useState } from 'react';
import { Input, Button, List, Checkbox, Space, Typography, Card } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './App.css';

const { Title } = Typography;

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="app">
      <Card className="todo-card">
        <Title level={2} className="todo-title">
          Todo List
        </Title>
        
        <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
          <Input
            placeholder="输入待办事项..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            size="large"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={addTodo}
            size="large"
          >
            添加
          </Button>
        </Space.Compact>

        <List
          dataSource={todos}
          locale={{ emptyText: '暂无待办事项' }}
          renderItem={(todo) => (
            <List.Item
              actions={[
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => deleteTodo(todo.id)}
                >
                  删除
                </Button>,
              ]}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              >
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#999' : '#333',
                  }}
                >
                  {todo.text}
                </span>
              </Checkbox>
            </List.Item>
          )}
        />

        {todos.length > 0 && (
          <div className="todo-stats">
            共 {todos.length} 项，已完成 {todos.filter((t) => t.completed).length} 项
          </div>
        )}
      </Card>
    </div>
  );
}

export default App;

