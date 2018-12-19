const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const buildPath = path.join(__dirname, './build');
const sourcePath = path.join(__dirname, './src');

const initPlugins = isProd => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: path.join(sourcePath, 'index.html'),
      path: buildPath,
      filename: 'index.html',
    }),
  ];

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({ filename: "style-[chunkhash:8].css" }),
    );
  }

  return plugins;
};

const initRules = isProd => {
  const rules = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.less$/,
      exclude: /(antd|custom).*\.less/,
      use: [
        !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            modules: true,
            localIdentName: "[local]___[hash:base64:5]",
          },
        },
        "postcss-loader",
        { loader: 'less-loader', options: { javascriptEnabled: true } },
      ],
    },
    {
      test: /(antd|custom).*\.less/,
      use: [
        !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader",
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: [
        !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    },
    {
      test: /\.(otf|woff2|png|gif|jpg|svg|woff|ttf|eot?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[ext]',
      },
    },
  ];

  if (!isProd) {
    rules.push(
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    );
  }

  return rules;
};

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return ({
    devtool: isProd ? '' : 'source-map',
    context: sourcePath,
    entry: {
      app: './index.jsx',
    },
    output: {
      path: buildPath,
      publicPath: './',
      filename: isProd ? '[name]-[chunkhash:8].js' : '[name].js',
    },
    module: {
      rules: initRules(isProd),
    },
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'src'),
      ],
      extensions: ['.js', '.jsx'],
    },
    plugins: initPlugins(isProd),
    devServer: {
      contentBase: isProd ? './build' : './src',
      publicPath: '/',
      port: 4000,
      overlay: true,
      open: true,
      proxy: [{
        context: ['/api', '/public'],
        target: 'http://127.0.0.1:5000',
        secure: false,
        changeOrigin: true,
      }],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: "common",
      },
    },
  });
};
