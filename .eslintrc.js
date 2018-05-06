module.exports = {
  root:true,
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  //https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard', //标准js风格， 需要安装模块：eslint-config-standard
  plugins: [
    'html',   //需要安装eslint-plugin-html插件，可以在html和vue文件中的<script></script>标签中启用eslint
  ],
    //  "off"或者0    //关闭规则关闭
    // "warn"或者1    //在打开的规则作为警告（不影响退出代码）
    // "error"或者2    //把规则作为一个错误（退出代码触发时为1）
  'rules': {
    //"规则名": [规则值, 规则配置],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // "semi": [2, "always"],//语句强制分号结尾
    // allow async-await
    'generator-star-spacing': 0, //生成器函数*的前后空格
    // allow debugger during development
    // "indent": [1, 2],//缩进风格 1是警告  只要2个空格
    // "eqeqeq": 1,//必须使用全等
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}