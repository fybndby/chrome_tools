import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

// 确保 dist 目录存在
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// 需要复制的文件列表
const filesToCopy = [
  { src: 'manifest.json', dest: 'manifest.json' },
  { src: 'background.js', dest: 'background.js' },
  { src: 'icon16.png', dest: 'icon16.png' },
  { src: 'icon48.png', dest: 'icon48.png' },
  { src: 'icon128.png', dest: 'icon128.png' },
  // 优先从 src/pages 目录复制 qrcode.png，如果不存在则从 public 复制
  { src: 'src/pages/qrcode.png', dest: 'qrcode.png', fallback: 'public/qrcode.png' },
];

// 复制文件
filesToCopy.forEach(({ src, dest, fallback }) => {
  const srcPath = join(rootDir, src);
  const destPath = join(distDir, dest);
  
  try {
    // 如果主文件存在，直接复制
    if (existsSync(srcPath)) {
      copyFileSync(srcPath, destPath);
      console.log(`✓ 已复制: ${src} -> ${dest}`);
    } 
    // 如果有备用路径且主文件不存在，尝试使用备用路径
    else if (fallback && existsSync(join(rootDir, fallback))) {
      const fallbackPath = join(rootDir, fallback);
      copyFileSync(fallbackPath, destPath);
      console.log(`✓ 已复制: ${fallback} -> ${dest}`);
    } 
    // 如果都不存在，警告
    else {
      console.warn(`⚠ 文件不存在: ${src}${fallback ? ` 和 ${fallback}` : ''}`);
    }
  } catch (error) {
    console.error(`✗ 复制失败 ${src}:`, error.message);
  }
});

console.log('\n扩展程序文件复制完成！');

