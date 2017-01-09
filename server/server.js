var express = require('express');
var app = express();

var gmRenderReact = require('./lib/gmRenderReact').default;

app.use(express.static('src'));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.get('/*', gmRenderReact);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
