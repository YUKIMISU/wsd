module.exports = {
  rules: [
    // {
    //   test: /\.js$/,
    //   use: {
    //     loader: 'babel-loader',
    //     options: {
    //       presets: ['stage-2']
    //     }
    //   }
    // },
    {
      test: /\.sass$/,
      loader: 'style-loader!css-loader!sass-loader'
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
      test: /\.html$/,
      loader: 'html-loader'
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
}