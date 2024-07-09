const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    popup: './scripts/popup.tsx',
    background: './scripts/background.tsx',
    settings: './scripts/settings.tsx', 
    help: './scripts/help.tsx' 
  },
  output: {
    path: path.resolve(__dirname, 'out/scripts'),
    filename: '[name].js', 
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '{}',
    }),
    new MiniCssExtractPlugin({
      filename: '../globals.css', 
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: path.resolve(__dirname, 'out') }, 
        { from: path.resolve(__dirname, 'src/app/globals.css'), to: path.resolve(__dirname, 'out/globals.css') }, 
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
};


  
