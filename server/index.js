import express from 'express';
import bluebird from 'bluebird';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import webpack from 'webpack';
import WebpackDevMiddleWare from 'webpack-dev-middleware';
import WebpackHotMiddleWare from 'webpack-hot-middleware';

import webpackConfig from '../webpack.config.dev';
import config from './config';

import users from './routes/users';
import auth from './routes/auth';
import questions from './routes/questions';

const app = express();
const compiler = webpack(webpackConfig);
const isDevelopment = app.get('env') !== 'production';
const DIST_DIR = path.join(__dirname, 'dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.set('port', process.env.PORT || config.PORT);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(express.static(path.join(__dirname, '/../public')));

mongoose.Promise = bluebird;
mongoose.connect(config.localMongodbURL, null).then(
  () => {
    if (isDevelopment) {
      app.use(WebpackDevMiddleWare(compiler, {
        publicPath: webpackConfig.output.publicPath,
        noInfo: true
      }));

      app.use(WebpackHotMiddleWare(compiler));

      app.use('/api/users', users);
      app.use('/api/auth', auth);
      app.use('/api/questions', questions);

      app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
      });
    } else {
      app.use(express.static(DIST_DIR));

      app.get('*', (req, res) => res.sendFile(HTML_FILE));
    }

    app.listen(app.get('port'));
  },
  err => console.error(err)
);
