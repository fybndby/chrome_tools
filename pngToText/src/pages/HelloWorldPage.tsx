import { Card, Button, Space } from 'antd';

function HelloWorldPage() {
  const handleCheckIn = () => {
    window.close();
  };

  return (
    <Card style={{ width: 400, textAlign: 'center' }}>
      <Space size="large" style={{ width: '100%' }}>
        <img 
          src="./qrcode.png"
          alt="打卡图片"
          style={{ 
            width: '200px', 
            height: '200px', 
            objectFit: 'contain',
            marginTop: '20px'
          }} 
        />
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
      </Space>
    </Card>
  );
}

export default HelloWorldPage;

