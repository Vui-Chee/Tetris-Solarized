import webpack from 'webpack';
import path from 'path';

module.exports = {
  entry: path.join(__dirname, 'src/index'),

  mode: 'production',

  output: {
    path: path.join(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.css'],
  },

  // Prevent fs module error, don't why it works though
  node: {
    fs: 'empty',
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
};
