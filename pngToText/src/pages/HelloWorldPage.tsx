import { Card, Button, Space } from 'antd';
import { useEffect, useState } from 'react';

function HelloWorldPage() {
  const [qrcodeUrl, setQrcodeUrl] = useState('/qrcode.png');

  useEffect(() => {
    // 在 Chrome 扩展环境中，使用 chrome.runtime.getURL 获取正确的路径
    const url = chrome?.runtime?.getURL('qrcode.png');
    if (url) {
      setQrcodeUrl(url);
    }
  }, []);

  const handleCheckIn = () => {
    window.close();
  };

  return (
    <Card style={{ width: 600 }}>
      <Space size="large" style={{ width: '100%' }}>
        <img
          src={qrcodeUrl}
          alt="打卡图片"
          style={{
            width: '400px',
            objectFit: 'contain',
            marginTop: '20px'
          }}
        />
        <div>
          <Button
            type="primary"
            size="large"
            onClick={handleCheckIn}
            style={{
              marginBottom: '20px',
              width: '120px'
            }}
          >
            确认打卡
          </Button>
        </div>
      </Space>
    </Card>
  );
}

export default HelloWorldPage;

