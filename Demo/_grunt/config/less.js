module.exports = {
    // 分支 -> 开发向
    build_css: {
        files: [
            {
                expand: true, //启用动态扩展
                cwd: 'less/', // css文件源的文件夹
                src: ['style-*.less'], // 匹配规则
                dest: 'css/', //导出css和雪碧图的路径地址
                ext: '.css' // 导出的css名
            }
        ],
        options: {
            yuicompress: false
        }
    }
};
