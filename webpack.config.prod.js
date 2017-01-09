var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var DIST_DIR = path.resolve(__dirname, 'src/dist');
var SRC_DIR = path.resolve(__dirname, 'src');
var APP_DIR = path.resolve(__dirname, 'src/app');
var CSS_DIR = path.resolve(__dirname, 'src/css');

var extractFonts = new ExtractTextPlugin('fonts.min.css');
var extractSass = new ExtractTextPlugin('main.min.css');
var appExport = {
  devtool: 'eval',
  entry: [
    SRC_DIR + '/main.js',
    CSS_DIR + '/app.scss',
  ],
  output: {
      // path: DIST_DIR,
      filename: '[name].bundle.min.js',
      path: path.join(__dirname, 'src/dist/'),
      publicPath: '/src/dist/',
      chunkFilename: 'chunk[id].[chunkhash].js',
  },
  devServer:{
    contentBase: __dirname,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  },
  module: {
      loaders: [
          {
            test : /\.jsx?/,
            include : SRC_DIR,
              loaders: ['react-hot-loader','babel-loader'],
          },
          // {
          //   test: /(font)*\.css$/,
          //   loader: extractFonts.extract("css-loader")
          // },
          {
            test: /\.scss$/,
            loader: extractSass.extract("style-loader", "css-loader!sass-loader?includePaths[]=" + path.resolve(__dirname, "./src/css/") )
          },
          // {
          //   test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          //   loader : 'file-loader?publicPath=../&path=styles/fonts/[name]/&name=font-[name].[ext]'
          // }
      ]
  },
  plugins: [
    new CommonsChunkPlugin({ name:  'main' }),
    extractFonts,
    extractSass
  ]
};

module.exports = [appExport];
