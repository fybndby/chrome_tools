import { useState } from 'react';
import axios from 'axios';
import './ApiCaller.css';

interface FirstApiResponse {
  body: {
    redictUrl: string;
    companyName: string | null;
    appletType: string;
    tokenflag: string;
    appId: string;
    from: string;
    params: unknown;
    authflag: number;
    serviceId: string;
    hash: string;
    authStatus: string | null;
  };
  msg: string;
  state: number;
  successResult: {
    result: number;
    message: string;
  };
}

interface SecondApiResponse {
  // 根据实际返回结果定义
  [key: string]: unknown;
}

function ApiCaller() {
  const [loading, setLoading] = useState(false);
  const [step1Result, setStep1Result] = useState<string>('');
  const [extractedToken, setExtractedToken] = useState<string>('');
  const [step2Result, setStep2Result] = useState<string>('');
  const [error, setError] = useState<string>('');

  // 从 URL 中提取 token 参数
  const extractTokenFromUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get('token') || '';
    } catch {
      // 如果 URL 解析失败，尝试正则表达式提取
      const match = url.match(/token=([^&]+)/);
      return match ? match[1] : '';
    }
  };

  // 调用第一个接口
  const callFirstApi = async () => {
    setLoading(true);
    setError('');
    setStep1Result('');
    setExtractedToken('');
    setStep2Result('');

    try {
      const response = await axios.post<FirstApiResponse>(
        'https://qrcode.sh.gov.cn/open/cloud/redirectSceneforAppletByTb',
        {
          qrcodeInfo:
            'https://qrcode.sh.gov.cn/0036MDAwMkEwQ1QxOTkyNzc3MDU4MTYzOTc4MjQwMzAwNUdFN1g4',
          mw: 'LVx1%2BYF8lDHR38dZv1WvQN8QubOpBMyn3d8tFUHZwd71eAMvTztidX5tZ9QvCSPzVTR0e%2FE7U5Rzv%2FBdRXMgZ1rwWVzDY0tt%2B5i7kSORZEFfE9WjjQxr0pWLm8VKoH8h8GzPkhaDhXL%2Fie0QSc24gg%3D%3D',
          from: 'wx',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(222, response);

      const data = response.data;
      const resultJson = JSON.stringify(data, null, 2);
      setStep1Result(resultJson);

      // 从返回的 URL 中提取 token
      if (data.body?.redictUrl) {
        const token = extractTokenFromUrl(data.body.redictUrl);
        if (token) {
          setExtractedToken(token);
          // 自动调用第二个接口
          await callSecondApi(token);
        } else {
          setError('无法从 URL 中提取 token');
        }
      } else {
        setError('返回数据中没有 redictUrl');
      }
    } catch (err) {
      setError(`第一个接口调用失败: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  // 调用第二个接口
  const callSecondApi = async (token: string) => {
    try {
      const response = await axios.post<SecondApiResponse>(
        'https://suishenmafront1.sh.gov.cn/guest_reg/place-v1/accessControlOpen',
        {
          token: token,
          from: 'wx',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;
      setStep2Result(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(
        `第二个接口调用失败: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  };

  return (
    <div className="api-caller">
      <h2>API 调用工具</h2>

      <div className="controls">
        <button onClick={callFirstApi} disabled={loading}>
          {loading ? '调用中...' : '开始调用'}
        </button>
        {error && <div className="error">{error}</div>}
      </div>

      {extractedToken && (
        <div className="token-display">
          <h3>提取的 Token:</h3>
          <code className="token">{extractedToken}</code>
        </div>
      )}

      {step1Result && (
        <div className="result-section">
          <h3>第一步：获取 Token</h3>
          <pre className="result-json">{step1Result}</pre>
        </div>
      )}

      {step2Result && (
        <div className="result-section">
          <h3>第二步：使用 Token 调用接口</h3>
          <pre className="result-json">{step2Result}</pre>
        </div>
      )}
    </div>
  );
}

export default ApiCaller;

