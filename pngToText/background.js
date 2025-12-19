// background.js - Service Worker
chrome.action.onClicked.addListener((tab) => {
  // 获取扩展程序的 URL
  const extensionUrl = chrome.runtime.getURL('src/index.html');
  
  // 打开新标签页显示页面
  chrome.tabs.create({
    url: extensionUrl
  });
});

