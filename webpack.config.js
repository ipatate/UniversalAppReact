var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var DIST_DIR = path.resolve(__dirname, 'src/dist');
var SRC_DIR = path.resolve(__dirname, 'src');
var APP_DIR = path.resolve(__dirname, 'App/');
var CSS_DIR = path.resolve(__dirname, 'src/css');

// var extractFonts = new ExtractTextPlugin('fonts.min.css');
var extractSass = new ExtractTextPlugin('main.min.css');
var appExport = {
  devtool: 'eval',
  entry: [
    APP_DIR + '/main.jsx',
    CSS_DIR + '/app.scss',
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:4000'
  ],
  output: {
      // path: DIST_DIR,
      filename: '[name].bundle.min.js',
      path: path.join(__dirname, 'src/dist/'),
      publicPath: '/dist/',
      chunkFilename: 'chunk[id].[chunkhash].js',
  },
  devServer:{
    contentBase: __dirname,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    // "alias": {
    //   "react": "preact-compat",
    //   "react-dom": "preact-compat"
    // }
  },
  module: {
      loaders: [
          {
            test : /\.jsx?/,
            include : APP_DIR,
              loaders: ['react-hot-loader','babel-loader'],
          },
          // {
          //   test: /(fonts)*\.scss$/,
          //   loader: extractFonts.extract("css-loader!sass-loader")
          // },
          {
            test: /\.scss$/,
            loader: extractSass.extract("style-loader", "css-loader!sass-loader?includePaths[]=" + path.resolve(__dirname, "./src/css/") )
          },
          // {
          //   test   : /\.(ttf|eot|svg|woff(2)?)?$/,
          //   loader : `file-loader?publicPath=${SRC_DIR}/dist/&path=${SRC_DIR}/fonts/[name]/&name=font-[name].[ext]`
          // }
      ]
  },
  plugins: [
    new CommonsChunkPlugin({ name:  'main' }),
    new webpack.HotModuleReplacementPlugin(),
    // extractFonts,
    extractSass,
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
        BABEL_ENV: JSON.stringify('development/client')
      }
    })
  ]
};

module.exports = appExport;
