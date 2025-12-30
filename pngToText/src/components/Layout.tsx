import { useState } from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { AppstoreOutlined, BellOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './Layout.css';

const { Sider, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onMenuClick: (key: string) => void;
}

function Layout({ children, currentPage, onMenuClick }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems: MenuProps['items'] = [
    {
      key: 'todo',
      icon: <AppstoreOutlined />,
      label: '待办事项',
    },
    {
      key: 'remind',
      icon: <BellOutlined />,
      label: '事件提醒',
    },
  ];

  return (
    <AntLayout className="app-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={200}
        className="app-sider"
      >
        <div className="logo">
          {!collapsed && <span>Chrome Tools</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentPage]}
          items={menuItems}
          onClick={({ key }) => onMenuClick(key)}
        />
      </Sider>
      <AntLayout className="app-content-layout">
        <Content className="app-content">{children}</Content>
      </AntLayout>
    </AntLayout>
  );
}

export default Layout;

