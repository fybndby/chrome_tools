// Chrome 扩展 API 类型声明
declare const chrome: {
  runtime: {
    getURL(path: string): string;
  };
  tabs?: {
    query(queryInfo: { active?: boolean; currentWindow?: boolean; url?: string }): Promise<chrome.tabs.Tab[]>;
    remove(tabIds: number | number[]): Promise<void>;
  };
} | undefined;

declare namespace chrome {
  namespace tabs {
    interface Tab {
      id?: number;
      url?: string;
      active?: boolean;
      currentWindow?: boolean;
    }
  }
}
