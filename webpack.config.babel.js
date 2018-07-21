import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackTemplate from 'html-webpack-template'

export default {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.mp3', '.wav'],
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
        test: /\.(mp3|wav)$/,
        use: {
          loader: 'file-loader',
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: HtmlWebpackTemplate,
      filename: 'index.html',
      inject: 'body',
      title: 'Pomodoro Timer',
      appMountId: 'root',
    }),
  ]
}
