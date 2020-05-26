# demo-monaco-editor 在线编辑器项目

## 下载安装依赖
``` 
npm install
``` 

### 模式编译
```
npm run dev               //启动开发环境
npm run build             //以正式模式打包项目
npm run build --report    //以正式模式打包项目并查看bundle analyzer报告
npm run unit              //运行单元测试
npm test                  //运行所有测试
```

### 工程目录结构描述 （此工程为多页）
```shell
.
├── build   项目启动构建等配置
├── config  项目公共配置
├── src
    ├── assets  项目静态资源
        ├── css  自定义css样式资源
        ├── icons  自定义图标资源
        └── images  图片资源
    ├── common  公共资源/工具库
        └── bean.js  静态数据资源
    ├── components  公共组件
        ├── Dialog  对话框组件
        ├── Layout  frame组件
        ├── Monaco  在线编辑器组件
        ├── RouterTab  多页签路由组件
        ├── SlVueTree  树形源码包
        ├── Toast  toast提示组件
        └── Tree  树形封装控件
    ├── router 路由(页面路径配置)
    ├── views  页面
    ├── App.vue  项目当单页时的入口组件
    └── main.js  项目当单页时的入口文件
├── static 第三方静态资源文件
    └── monaco-editor  编辑器库
├── test  自动化测试模块
├── .babelrc  babel配置文件
├── .editorconfig  编辑器编码规范文件
├── .eslintignore  eslint忽略配置文件
├── .eslintrc.js   eslint配置文件
├── .postcssrc.js  postcss配置文件
└── index.html  模板文件
```
