import express from 'express';
// import logger from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import webpack from 'webpack';
import WebpackDevMiddleWare from 'webpack-dev-middleware';
import WebpackHotMiddleWare from 'webpack-hot-middleware';

import webpackConfig from '../webpack.config.dev';

import routes from './routes';

const app = express();
const compiler = webpack(webpackConfig);
const isDevelopment = app.get('env') !== 'production';
const DIST_DIR = path.join(__dirname, 'dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.set('port', process.env.PORT);

// app.use(logger('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(express.static(path.join(__dirname, '/../public')));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, null).then(
  () => {
    if (isDevelopment) {
      app.use(WebpackDevMiddleWare(compiler, {
        publicPath: webpackConfig.output.publicPath,
        noInfo: true
      }));

      app.use(WebpackHotMiddleWare(compiler));

      app.use('/api', routes);

      app.get('/*', (req, res) => {
        res.render('index', { title: 'IFE: Interview for Everyone.' });
      });
    } else {
      app.use(express.static(DIST_DIR));

      app.get('*', (req, res) => res.sendFile(HTML_FILE));
    }

    app.listen(app.get('port'));
  },
  err => console.error(err)
);
