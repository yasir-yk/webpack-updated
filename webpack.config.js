const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''

  },
  mode: 'production',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: './dist',
    hot: true,
    port: 3000,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
       
      {
        test: /\.(png|svg|jpe?g|gif)$/i, 
        //type: 'asset/resource',
        generator: {
          // adding a hash to the file
          filename: '../../images/[name][ext]',
        },
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name][ext]',
              outputPath: 'images',
              publicPath:'images',
              emitFile: true,
              esModule: false

            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            },
          },
        ],
      },
    ]
  },
  plugins: [
    
    new MiniCssExtractPlugin({
      filename: 'css/all.css'
    }),
     new HtmlWebpackPlugin({
      template: './src/main.html',
      filename: 'index.html',
       chunks: ['main'], // Use 'main' as the entry point or chunk name
    }),
    new HtmlWebpackPlugin({
      template: './src/mainabout.html',
      filename: 'about.html',
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: 'src/', to: './',
          globOptions: {
            ignore: ['**/index.js', '**/scss/**', '**/main.html', '**/createImageModule.js'], // Exclude index.js file
          },
         },
      ],
    }),
    new CleanWebpackPlugin(),
  ]
};
