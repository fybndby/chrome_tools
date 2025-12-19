import { watch } from 'fs';
import { exec } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const srcDir = join(rootDir, 'src');

let buildTimeout;

function build() {
  clearTimeout(buildTimeout);
  buildTimeout = setTimeout(() => {
    console.log('\n🔄 检测到文件变化，重新构建...\n');
    exec('npm run build', { cwd: rootDir }, (error, stdout, stderr) => {
      if (error) {
        console.error(`构建错误: ${error}`);
        return;
      }
      console.log(stdout);
      if (stderr) console.error(stderr);
      console.log('\n✅ 构建完成！请在 Chrome 扩展程序页面刷新扩展程序。\n');
    });
  }, 500); // 防抖 500ms
}

console.log('👀 开始监听文件变化...');
console.log('📝 修改 src/ 目录下的文件会自动重新构建');
console.log('🔄 构建完成后，请在 chrome://extensions 页面刷新扩展程序\n');

watch(srcDir, { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(`📝 文件变化: ${filename}`);
    build();
  }
});

// 初始构建
build();

