const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'web'),
    filename: 'index.js'
  },

  devtool: 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-2']
        }
      }
    ]
  },

  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js']
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Shopping list',
      inject: true,
      inlineSource: '.(js)$' // embed all javascript and css inline
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, "web"),
    compress: true,
    port: 8080
  }
};