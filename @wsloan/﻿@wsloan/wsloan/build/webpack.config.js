const path = require('path');
const vuxLoader = require('vux-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const lockBabel = require('./lock_babel.js');

module.exports = function (env) {
  lockBabel(true);
  let type = env.pc ? 'pc' : 'app';
  let entry = './dev/' + type + '.js';
  let port = env.pc ? 5000 : 5001;
  let aliasObject = require('./alias.js');
  let alias = {};
  alias = Object.assign(alias, aliasObject[type].alias);
  console.log(alias);

  return vuxLoader.merge({
    entry: [
      'webpack-dev-server/client?http://localhost:' + port,
      entry
      // './dev/app.js'
      // './src/entries/app.js'
      // './src/entries/pc.js'
    ],

    output: {
      filename: 'bundle.js',
      // path: path.resolve(__dirname, 'dist')
      path: path.resolve(__dirname, './')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['stage-2']
            }
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: 'vue-style-loader!css-loader!sass-loader',
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
              less: 'vue-style-loader!css-loader!less-loader',
              js: 'babel-loader'
            }
          }
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader'
        },
        {
          test: /\.less$/,
          loader: 'style-loader!css-loader!less-loader'
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name]-[hash:8].[ext]'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.vue'],
      alias
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './dev/index.html',
        inject: true
      })
    ],
    devtool: 'cheap-eval-source-map',

    devServer: {
      port
    }


  }, {
    plugins: [
      {
        name: 'vux-ui'
      }
    ]
  });
};

