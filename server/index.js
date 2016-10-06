import express from 'express';
import open from 'open';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev.js';

let port = 3003;
let app = express();

app.use(webpackMiddleware(webpack(webpackConfig)));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
  open(`http://localhost:${port}`);
});
