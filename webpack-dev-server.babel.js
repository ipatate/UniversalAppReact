require('babel-core/register');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var shell = require('shelljs');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '*': { target: 'http://localhost:3000' }
    }
})
.listen(4000, function () {
    shell.env.PORT = shell.env.PORT || 3000;
    shell.exec('"./node_modules/.bin/nodemon" index.js -e js,jsx,pug', function () {});
    console.log('Webpack Dev Server listening on port 4000');
});
