import path from 'path';
import webpack from 'webpack';

export default {
  devtool: process.env.NODE_ENV !== 'production'
    ? 'eval-source-map'
    : null,
  entry: [
    'webpack-hot-middleware/client', 'react-hot-loader/patch', path.join(__dirname, '/client/index.js')
  ],
  output: {
    path: '/',
    publicPath: '',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack
      .optimize
      .OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared')
        ],
        loaders: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
};
