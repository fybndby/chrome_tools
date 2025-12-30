// background.js - Service Worker
chrome.action.onClicked.addListener((tab) => {
  // 获取扩展程序的 URL
  const extensionUrl = chrome.runtime.getURL('src/index.html');
  // 打开新标签页显示页面
  chrome.tabs.create({
    url: extensionUrl
  });
});

// 定时检查，在 16:55 时打开 HelloWorld 页面
function checkAndOpenHelloWorld() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  // 如果当前时间是 16:55，打开 HelloWorld 页面
  if (hours === 16 && minutes === 55) {
    const extensionUrl = chrome.runtime.getURL('src/index.html?page=helloworld');
    chrome.tabs.create({
      url: extensionUrl
    });
  }
}

// 设置明天的 16:55 的闹钟
function setAlarmForTomorrow() {
  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(17, 2, 0, 0);
  // 如果今天已经过了 16:55，设置为明天
  if (now >= targetTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }
  chrome.alarms.create('openHelloWorld', {
    when: targetTime.getTime()
  });
}

// 监听闹钟事件
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'openHelloWorld') {
    const extensionUrl = chrome.runtime.getURL('src/index.html?page=helloworld');
    chrome.tabs.create({
      url: extensionUrl
    });
    // 设置下一次的闹钟（明天同一时间）
    setAlarmForTomorrow();
  }
});

// 扩展启动时设置闹钟
setAlarmForTomorrow();

// 每分钟也检查一次（作为备用方案）
chrome.alarms.create('checkTime', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkTime') {
    checkAndOpenHelloWorld();
  }
});

