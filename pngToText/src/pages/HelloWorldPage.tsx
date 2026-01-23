import { Card, Button } from 'antd';
import { useEffect, useState } from 'react';
import './HelloWorldPage.css';

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
    <div className="hello-world-page">
      <Card className="checkin-card">
        <div className="card-header">
          <h2 className="card-title">早上好，请先扫码打卡</h2>
        </div>
        <div className="qrcode-container">
          <img
            src={qrcodeUrl}
            alt="打卡图片"
            className="qrcode-image"
          />
        </div>
        <div className="button-container">
          <Button
            type="primary"
            size="large"
            onClick={handleCheckIn}
            className="checkin-button"
          >
            确认打卡
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default HelloWorldPage;

