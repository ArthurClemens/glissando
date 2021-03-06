import path from 'path';
import webpack from 'webpack';

const baseDir = process.cwd();
const { env } = process;

export const config: webpack.Configuration = {
  context: path.resolve(baseDir, './src'),

  entry: {
    index: path.resolve(baseDir, env.ENTRY || './src/index.js'),
  },

  output: {
    path: path.resolve(baseDir, './dist'),
    filename: 'js/[name].js',
  },

  resolve: {
    // Make sure that libs are included only once
    alias: {
      'mithril/stream': path.resolve(
        baseDir,
        'node_modules/mithril/stream/stream.js',
      ),
      mithril: path.resolve(baseDir, 'node_modules/mithril/mithril.js'),
      react: path.resolve(baseDir, 'node_modules/react'),
      'react-dom': path.resolve(baseDir, 'node_modules/react-dom'),
      'react-router-dom': path.resolve(
        baseDir,
        'node_modules/react-router-dom',
      ),
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: '../../scripts/babel.config.js',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },

  plugins: [],

  devtool: 'source-map',
};
