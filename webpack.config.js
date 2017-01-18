var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var DIST_DIR = path.resolve(__dirname, 'public/dist');
var SRC_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'App/');
var appExport = {
  devtool: 'inline-source-map',
  entry: [
    APP_DIR + '/main.jsx',
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:4000'
    // 'webpack-hot-middleware/client',
  ],
  output: {
      filename: '[name].bundle.min.js',
      path: path.join(__dirname, 'public/dist/'),
      publicPath: '/dist/',
      chunkFilename: 'chunk[id].[chunkhash].js',
  },
  devServer:{
    contentBase: __dirname,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    // "alias": {
    //   "react": "preact-compat",
    //   "react-dom": "preact-compat"
    // }
  },
  module: {
      rules: [
          {
            test : /\.jsx?/,
            include : APP_DIR,
            use: ['babel-loader'],
          },
          {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader?includePaths[]=" + path.resolve(__dirname, "./public/css/")],
          },
      ]
  },
  plugins: [
    new CommonsChunkPlugin({ name:  'main' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
        BABEL_ENV: JSON.stringify('development/client'),
        DEV_TOOLS: JSON.stringify(process.env.DEV_TOOLS || false),
      }
    })
  ]
};

module.exports = appExport;
