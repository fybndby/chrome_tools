import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import TodoPage from './pages/TodoPage';
import HelloWorldPage from './pages/HelloWorldPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('todo');

  // 检查 URL 参数，如果是从定时任务打开的，显示 HelloWorld 页面
  useEffect(() => {
    const urlParams = new URLSearchParams(globalThis.location.search);
    if (urlParams.get('page') === 'helloworld') {
      setCurrentPage('helloworld');
    }
  }, []);

  const handleMenuClick = (key: string) => {
    setCurrentPage(key);
  };

  const renderPage = () => {
    if (currentPage === 'remind') {
      return <HelloWorldPage />;
    }
    return <TodoPage />;
  };

  return (
    <div className="app">
      <Layout currentPage={currentPage} onMenuClick={handleMenuClick}>
        {renderPage()}
      </Layout>
    </div>
  );
}

export default App;

