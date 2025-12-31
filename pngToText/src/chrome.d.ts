// Chrome 扩展 API 类型声明
declare const chrome: {
  runtime: {
    getURL(path: string): string;
  };
} | undefined;
