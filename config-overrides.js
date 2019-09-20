const {override, fixBabelImports, addLessLoader} = require('customize-cra');

 module.exports = override( fixBabelImports('import', { // 这里的inport使用的是： babel-plugin-import插件
     libraryName: 'antd', 
     libraryDirectory: 'es', 
     style: true, // 使用less实现按需加载样式，例如页面只是单单的使用button，则自动按需引入button的样式，其他不引入。
    }), 
    
    addLessLoader({ 
        javascriptEnabled: true, 
        modifyVars: {'@primary-color': '#7546C9'}, // 更改antd组件的默认primary的样式（要根据文档来自定义主题）
    })
);