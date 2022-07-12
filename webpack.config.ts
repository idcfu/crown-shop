import 'webpack-dev-server';

import CopyPlugin from 'copy-webpack-plugin';
import HTMLPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';

const isProduction = process.argv.includes('production');
const devtool = isProduction ? false : 'source-map';
const contenthash = isProduction ? '.[contenthash:5]' : '';

const config: Configuration = {
  devtool,
  entry: './src',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: `scripts/[name]${contenthash}.js`,
    publicPath: '/',
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new HTMLPlugin({
      template: 'src/assets/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: `styles/[name]${contenthash}.css`,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, 'src', 'assets', 'favicons'),
          to: 'favicons',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: (content: string, { resourcePath }: { resourcePath: string }) => (
                resourcePath.includes('media.scss') ? '' : `@import "src/styles/media";${content}`
              ),
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        resourceQuery: /inline/,
        issuer: /\.tsx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /.(gif|jpe?g|png|svg|webp)$/,
        resourceQuery: {
          not: /inline/,
        },
        type: 'asset',
        generator: {
          filename: `images/[name]${contenthash}[ext]`,
        },
      },
      {
        test: /.woff2?$/,
        type: 'asset/resource',
        generator: {
          filename: `fonts/[name]${contenthash}[ext]`,
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    open: true,
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      '@assets': resolve(__dirname, 'src', 'assets'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
};

export default config;
