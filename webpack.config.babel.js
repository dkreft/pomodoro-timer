import path from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackTemplate from 'html-webpack-template'

export default {
  mode: 'development',
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.mp3',
      '.sass',
      '.wav',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(mp3|wav)$/,
        use: {
          loader: 'file-loader',
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: HtmlWebpackTemplate,
      filename: 'index.html',
      headHtmlSnippet: makeHeadHtmlSnippet(),
      inject: 'body',
      title: 'Pomodoro Timer',
      appMountId: 'root',
    }),
  ]
}

function makeHeadHtmlSnippet() {
  return `
    <style>
      html {
        font-size: 16px;
      }
    </style>
  `
}
