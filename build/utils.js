'use strict';

const path = require('path');

// 在项目根目录的基础上组合路径
exports.join = p => path.join(__dirname, '../', p);

// 组合静态文件路径
exports.staticPath = p => path.join('static', p);