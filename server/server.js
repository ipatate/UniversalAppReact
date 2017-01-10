const express = require('express');

const app = express();

const gmRenderReact = require('./lib/gmRenderReact').default;

app.use(express.static('public'));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.get('/*', gmRenderReact);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');// eslint-disable-line
});
