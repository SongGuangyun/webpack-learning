const path  = require('path');
const webpack = require('webpack')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');
var version = require('./package.json').version
module.exports = {
  mode: 'production',
  // 会准确告诉你报错在哪个文件
  devtool: 'eval-source-map',
  entry:{
    main: './src/main.js'
  },
  devServer: {
    // 告诉服务器从哪里提供内容
    contentBase: path.join(__dirname, 'dist'),
    // 启用 webpack 的模块热替换特性，关闭了就不心事[HMR] Waiting for update signal from WDS...
    hot: true,
    // 主机名
    host: config.dev.host,
    // 端口
    port: config.dev.port,
    // npm run start 自动打开浏览器
    open: true,
    // 压缩
    compress: false,
    // 该选项将确定从哪里提供dist目录
    publicPath: '/',
    // 开启了这个，就不会有打包的progress出现在控制台了
    // clientLogLevel: 'warning',
    // 除了初始信息，任何内容不会显示在控制台
    // quiet: true,
    // 在webpack-dev-server --inline   这个inline参数就表示这个为true了，开启inline模式后，网页会嵌入一段iframe
    inline: true
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name].min.js',
    // publicPath: "/assets/",
  },
  resolve: {
    // 能够使用户在引入模块时不带扩展后缀
    extensions: [
      '.js',
      '.json'
    ]
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        // 排除该目录
        exclude: '/node_modules/',  
        loader: 'babel-loader',
      },
      // useEslint为true数组才不是空，否则规则为空，表示不用eslint
      ...(config.dev.useEslint ? [{
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'eslint-loader',
      }] : []),
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: '6000',
          name: 'static/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use:[
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]

  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),  // 启用HMR(热模块替换)
    // 创建全局常量//使用：console.log(VERSION);
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(version),
    }),
    new UglifyjsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}