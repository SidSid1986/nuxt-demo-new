import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径 (ES Module 写法)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 构造绝对路径
const targetPath = path.join(__dirname, 'assets', 'css', 'main.css');

console.log('🔍 正在检查绝对路径:', targetPath);
console.log('-----------------------------------');

if (fs.existsSync(targetPath)) {
  const stats = fs.statSync(targetPath);
  console.log('✅ 成功！文件存在。');
  console.log('   - 文件大小:', stats.size, 'bytes');
  console.log('   - 最后修改时间:', stats.mtime);
} else {
  console.log('❌ 失败！Node.js 找不到这个文件！');
  console.log('-----------------------------------');
  
  // 尝试诊断：assets 文件夹存在吗？
  const assetsPath = path.join(__dirname, 'assets');
  if (fs.existsSync(assetsPath)) {
    console.log('ℹ️ assets 文件夹存在。其内容包括:');
    try {
      const items = fs.readdirSync(assetsPath);
      items.forEach(item => console.log('   - ' + item));
      
      // 如果 assets 下有 css 文件夹，也打印出来
      if (items.includes('css')) {
         const cssPath = path.join(assetsPath, 'css');
         const cssItems = fs.readdirSync(cssPath);
         console.log('   📂 assets/css 文件夹内容包括:');
         cssItems.forEach(item => console.log('      - ' + item));
      }
    } catch (e) {
      console.log('   (无法读取 assets 目录)', e.message);
    }
  } else {
    console.log('❌ assets 文件夹根本不存在！');
    console.log('   当前根目录内容:');
    const rootItems = fs.readdirSync(__dirname);
    rootItems.forEach(item => console.log('      - ' + item));
  }
}