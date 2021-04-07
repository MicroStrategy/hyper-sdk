const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const pages = [
  'auth',
  'enable-disable-cards',
  'handling-errors',
  'highlight',
  'index',
  'init',
  'preview',
  'search',
  'welcome',
];

module.exports = {
  stats: 'errors-warnings',
  mode: 'production',
  target: 'es5',
  entry: pages.reduce((dict, page) => {
    dict[page] = `./src/js/${page}.js`;
    return dict;
  }, {}),
  output: {
    filename: 'js/[name].js',
    path: path.join(path.dirname(__dirname), 'code-examples'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'css/',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/img', to: 'img' }],
    }),
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          filename: `${page}.html`,
          template: `src/html/${page}.html`,
          minify: true,
          meta: {
            charset: { charset: 'utf-8' },
            viewport: 'width=device-width, initial-scale=1',
          },
          chunks: [page],
        }),
    ),
    new HtmlWebpackTagsPlugin({
      usePublicPath: false,
      append: false,
      links: [
        'https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css',
        {
          path:
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.6.0/styles/vs.min.css',
          attributes: {
            integrity:
              'sha512-aWjgJTbdG4imzxTxistV5TVNffcYGtIQQm2NBNahV6LmX14Xq9WwZTL1wPjaSglUuVzYgwrq+0EuI4+vKvQHHw==',
            crossorigin: 'anonymous',
          },
        },
        'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
        'css/index.css?v=' + Date.now(),
      ],
      scripts: [
        {
          path:
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.6.0/highlight.min.js',
          attributes: {
            integrity:
              'sha512-zol3kFQ5tnYhL7PzGt0LnllHHVWRGt2bTCIywDiScVvLIlaDOVJ6sPdJTVi0m3rA660RT+yZxkkRzMbb1L8Zkw==',
            crossorigin: 'anonymous',
          },
        },
        {
          path:
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.6.0/languages/javascript.min.js',
          attributes: {
            integrity:
              'sha512-u9dJCEIlcxWLWzlBIBDAO98TI5r1yrxGwRY2vbqFdecd58lamsEgBt1p4sDNBncNUMDV5//WdywRHdhCLx0FJQ==',
            crossorigin: 'anonymous',
          },
        },
        {
          path:
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.6.0/languages/htmlbars.min.js',
          attributes: {
            integrity:
              'sha512-N281H+dDdKZeUaC1nK7f7GTiA39w3Pw8H0zlYVNJT85V2BjH6Cz52ANRxvblhmxMOSs+rFSHkGXGEYKQbDLG9A==',
            crossorigin: 'anonymous',
          },
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({ sourceMap: false }),
    ],
  },
};
