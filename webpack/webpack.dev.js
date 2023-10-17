var SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/**
 * Is build for Production
 * @type {boolean}
 */
 const isProd = process.argv.includes('production');


/*
 * In development mode, we connect our own websocket server
 */
if (!isProd) {
  require('../js/core/io.js');
}

module.exports = {
  entry: './js/index.js',
  output: {
    publicPath: '/model-UML',
    filename: '[hash].bundle.js',
  },
  plugins: [
     /**
     * Simplifies creation of HTML files to serve your webpack bundles.
     * @see https://github.com/jantimon/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      template: 'index.template.html',
      filename: 'index.html',

    }),
    
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  }
};