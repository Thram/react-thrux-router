/**
 * Created by thram on 18/01/17.
 */
import { join } from 'path';

const include = join(__dirname, 'src');

const production = process.env.NODE_ENV === 'production';
const config = {
  entry: { 'react-thrux-router': './src/index' },
  output: {
    path: join(__dirname, 'dist'),
    filename: `[name]${production ? '.min' : ''}.js`,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: production ? 'eval' : 'source-map',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', include },
    ],
  },
};

export default [config, Object.assign({}, config, {
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'ReactThruxRouter',
    filename: `[name].umd${production ? '.min' : ''}.js`,
  },
})];
