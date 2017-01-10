import express from 'express';

const app = express();

if (process.env.NODE_ENV === 'development') {
  const config = require('../webpack.config');// eslint-disable-line
  const webpack = require('webpack');// eslint-disable-line
  const webpackDevMiddleware = require('webpack-dev-middleware');// eslint-disable-line
  const webpackHotMiddleware = require('webpack-hot-middleware');// eslint-disable-line
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: { colors: true },
    hot: true,
    historyApiFallback: true,
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,// eslint-disable-line
  }));
}
const gmRenderReact = require('./lib/gmRenderReact').default;

app.use(express.static('public'));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.get('/*', gmRenderReact);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');// eslint-disable-line
});
