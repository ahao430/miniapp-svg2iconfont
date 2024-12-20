const svgtofont = require("svgtofont");
const path = require("path");
const fs = require('fs-extra');
const { optimize } = require('svgo');
const resolve = (dir) => path.resolve(process.cwd(), dir);
const {
    optimizeSvgs,
    svg2font,
    ttf2Base64,
    copy,
} = require('./utils/index');



/**
 * miniSvg2Font
 * @param {*} options 
 */
const miniSvg2Font = (options) => {
  options = {
    svg: '', // svg目录
    build: __dirname + '/temp', // iconfont输出目录
    dest: '', // base64输出路径及文件名
    htmlDest: '',
    fontName: 'icon',
    cb: () => {console.log('完成')},
    ...options,
  }

  const SVG_PATH = options.svg;
  const BUILD_PATH = options.build;
  const DEST = options.dest;
  const HTML_DEST = options.htmlDest;
  
  // 清空fonts
  fs.emptyDirSync(BUILD_PATH);
  
  // 去除svg头部xml信息
  optimizeSvgs(SVG_PATH);
  
  // svg编译字体
  svg2font(SVG_PATH, BUILD_PATH, options.fontName, () => {
      // ttf转base64
      ttf2Base64(BUILD_PATH, options.fontName, DEST);
      if (HTML_DEST) {
        copy(DEST, HTML_DEST)
      }
      if (options.cb && typeof options.cb === 'function') {
        options.cb()
      }
  });
}


module.exports = miniSvg2Font