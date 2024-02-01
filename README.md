# miniapp-svg2iconfont

小程序本地svg转base64格式iconfont

基于svgtoiconfont，将svg图片转换成iconfont文件。再将ttf文件转成base64格式，替换css文件，方便小程序使用。

## 安装

```
npm i miniapp-svg2iconfont -D
```
请在node版本大于14安装

## 用法

参见demo

1. package.json增加编译脚本
   ```json
     "scripts": {
       "font": "node scripts/svg2font"
     },
   ```
2. 脚本文件中引入，传入svg目录和输出文件。
   ```js
   // scripts/svg2font.js
   const svg2font = require('miniapp-svg2iconfont')

   svg2font({
     svg: 'svg', // svg目录
     dest: 'iconfont.wxss' // 输出的iconfont.css文件
   })
   ```

## 参数

svg: '', // svg目录
build: __dirname + '/temp', // iconfont输出目录
dest: '', // base64输出路径及文件名
fontName: 'icon',
cb: () => {console.log('完成')},
