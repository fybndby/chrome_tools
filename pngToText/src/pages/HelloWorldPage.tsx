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

  const handleCheckIn = async () => {
    // 使用 Chrome Extension API 关闭当前标签页
    if (chrome?.tabs) {
      try {
        // 查询当前窗口的当前标签页
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tabs && tabs.length > 0 && tabs[0].id) {
          await chrome.tabs.remove(tabs[0].id);
          return;
        }
      } catch (error) {
        console.error('关闭标签页失败:', error);
      }
    }

    // 备用方案：尝试使用 window.close()
    try {
      window.close();
    } catch (error) {
      console.error('无法关闭窗口:', error);
    }
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

