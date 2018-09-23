// 這邊使用 HtmlWebpackPlugin，將 bundle 好的 <script> 插入到 body。${__dirname} 為 ES6 語法對應到 __dirname  
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const rootPath = path.join(__dirname, '..');
const appPath = path.join(rootPath, 'app');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${appPath}/index.html`,
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  devtool: 'eval-source-map',
  // 檔案起始點從 entry 進入，因為是陣列所以也可以是多個檔案
  entry: [
    './app/index.js',
  ],
  // output 是放入產生出來的結果的相關參數
  output: {
    path: `${rootPath}/dist`,
    filename: 'index_bundle.js',
  },
  module: {
    // rules 則是放欲使用的 loaders
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use:["style-loader","css-loader","postcss-loader"],
      },
      {
        test: /\.less$/,
        use:["style-loader","css-loader","postcss-loader","less-loader"],
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      },
      {
        test: /.(gif|jpg|png$)/,
        loader: 'file?name=images/[name]-[hash:8].[ext]'
      },
    ],
  },
  // 定义变量
  resolve: {
    extensions: ['.js','.jsx','.less','.css'],
    alias: {
      components: path.join(appPath, 'components'),
      actions: path.join(appPath, 'actions'),
      reducers: path.join(appPath, 'reducers'),
      containers: path.join(appPath, 'containers'),
      routes: path.join(appPath, 'routes'),
    }    
  },
  // devServer 則是 webpack-dev-server 設定
  devServer: {
    inline: true,
    port: 8008,
  },
  // plugins 放置所使用的外掛
  plugins: [HTMLWebpackPluginConfig],
};