const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(require('./routes'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

module.exports = app;