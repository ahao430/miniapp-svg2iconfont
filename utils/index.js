const svgtofont = require("svgtofont");
const path = require("path");
const fs = require('fs-extra');
const { optimize } = require('svgo');
const resolve = (dir) => path.resolve(process.cwd(), dir);

// 去除svg头部xml信息
const optimizeSvgs = (dir) => {
    const svgs = fs.readdirSync(resolve(dir));
    // 遍历读取到的文件列表
    svgs.forEach(filename => {
    // 获取当前文件的绝对路径
        const fileDir = resolve(`${dir}/${filename}`);
        // 读取文件内容
        if (fileDir.includes('.svg')) { // 是svg文件
            const data = fs.readFileSync(fileDir, 'utf8');
            // console.log(data)
            const result = optimize(data);
            // 写入原文件
            // eslint-disable-next-line max-nested-callbacks
            fs.writeFileSync(fileDir, result.data);
        }
    });
    console.log('优化svg完成');
};

const svg2font = (src, dist, fontName, cb) => {
    svgtofont({
        src: src, // svg path
        dist: dist, // output path
        // styleTemplates: path.resolve(process.cwd(), "src/fonts"), // file templates path (optional)
        fontName: fontName, // font name
        css: true, // Create CSS files.
        startUnicode: 0xea01, // unicode start number
        svgicons2svgfont: {
            fontHeight: 1000,
            normalize: true
        },
        // website = null, no demo html files
        website: {
            title: "svgtofont",
            // Must be a .svg format image.
            logo: '',
            // version: pkg.version,
            meta: {
                description: "Converts SVG fonts to TTF/EOT/WOFF/WOFF2/SVG format.",
                keywords: "svgtofont,TTF,EOT,WOFF,WOFF2,SVG"
            },
            description: ``,
            // Add a Github corner to your website
            // Like: https://github.com/uiwjs/react-github-corners
            corners: {
                url: 'https://github.com/jaywcjlove/svgtofont',
                width: 62, // default: 60
                height: 62, // default: 60
                bgColor: '#dc3545' // default: '#151513'
            },
            links: [
                {
                    title: "GitHub",
                    url: "https://github.com/jaywcjlove/svgtofont"
                },
                {
                    title: "Feedback",
                    url: "https://github.com/jaywcjlove/svgtofont/issues"
                },
                {
                    title: "Font Class",
                    url: "index.html"
                },
                {
                    title: "Unicode",
                    url: "unicode.html"
                }
            ],
            footerInfo: `Licensed under MIT. (Yes it's free and <a href="https://github.com/jaywcjlove/svgtofont">open-sourced</a>`
        }
    })
        .then(() => {
            console.log('生成字体!');
            cb && cb();
        });
};

const copy = (src, dest) => {
  fs.copyFileSync(src, dest);
}
const ttf2Base64 = (buildDir, fontName, dest) => {
    const ttf = fs.readFileSync(`${buildDir}/${fontName}.ttf`);
    const base64Str = Buffer.from(ttf).toString('base64');
    // 写入到css
    let cssText = fs.readFileSync(`${buildDir}/${fontName}.css`, 'utf8');
    cssText = cssText.replace(/@font\-face[^\}]*\}/, `@font-face {
font-family: "${fontName}";
src: url("data:font/ttf;charset=utf-8;base64,${base64Str}");
}`);
    fs.writeFileSync(`${buildDir}/${fontName}.base64.css`, cssText, 'utf8');
    console.log('转base64!');

    // copy to dest
    fs.copyFileSync(`${buildDir}/${fontName}.base64.css`, dest);
};

module.exports = {
    optimizeSvgs,
    svg2font,
    ttf2Base64,
    copy,
};
