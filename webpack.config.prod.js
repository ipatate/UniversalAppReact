var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var DIST_DIR = path.resolve(__dirname, 'public/dist');
var SRC_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'App/');
var CSS_DIR = path.resolve(__dirname, 'public/css');

var extractSass = new ExtractTextPlugin({
  filename: 'main.min.css'
});
var appExport = {
  devtool: 'cheap-module-source-map',
  entry: [
    APP_DIR + '/main.jsx',
    CSS_DIR + '/app.scss',
  ],
  output: {
      // path: DIST_DIR,
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
            loader: ExtractTextPlugin.extract({
              fallbackLoader: "style-loader",
              loader: "css-loader!sass-loader?includePaths[]=" + path.resolve(__dirname, "./public/css/"),
              publicPath: DIST_DIR
            })
          },
      ]
  },
  plugins: [
    new CommonsChunkPlugin({ name:  'main' }),
    extractSass,
    new webpack.optimize.UglifyJsPlugin({
      // minimize: true,
      sourceMap: true,
      output: {
        comments: false,
      },
      compressor: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
  ]
};

module.exports = appExport;
