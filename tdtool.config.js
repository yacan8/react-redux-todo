const path = require('path');
const pkg = require('./package.json');
const Config = require('tdtool').Config;
const dll = require('./tdtool.dll.config');
const isDebug = !(process.env.NODE_ENV === 'production');
const clientConfig = new Config({
  entry: {
    [pkg.name]: './src/client/index'
  },
  sourceMap: true,
  devtool: "source-map",
  filename: '[name].[hash].js',
  minimize: !isDebug,
  extends: [['react', {
    plugins: [
      ["import", { libraryName: "antd", style: true }]
    ]
  }], ['less', {
    extractCss: {
      filename: '[name].[hash].css',
      allChunks: true
    },
    happypack: true
  }]],
  env: {
    __DEV__: isDebug,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
  dll
});
clientConfig.add('output.path', path.join(process.cwd(), 'dist', 'client'));
// clientConfig.add('output.chunkFilename', '[name].chunk.js');
const AssetsPlugin = require('assets-webpack-plugin');
clientConfig.add(
  'plugin.AssetsPlugin',
  new AssetsPlugin({
    path: './dist/client',
    filename: 'assets.json',
    prettyPrint: true
  })
);

const serverConfig = new Config({
  entry: './src/server',
  target: 'node',
  filename: 'server.js',
  sourceMap: true,
  devServer: true,
  externals: [/^\.\/client\/assets\.json$/],
  extends: ['react']
});

module.exports = [clientConfig.resolve(), serverConfig.resolve()];
