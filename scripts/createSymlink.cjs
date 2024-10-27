const fs = require('fs');
const path = require('path');

// 定义源文件夹和目标文件夹路径
const source = './assets';
const target = './public/assets';

// 检查目标路径是否存在，不存在则创建
if (!fs.existsSync(target)) {
    // 创建软链接
    fs.symlink(source, target, (err) => {
        if (err) {
            console.error('创建软链接失败:', err);
        } else {
            console.log(`成功创建软链接 ${target} 指向 ${source}`);
        }
    });
} else {
    console.log(`目标路径已存在: ${target}`);
}
