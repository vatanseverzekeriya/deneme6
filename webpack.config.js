const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
  mode: 'development',
  entry: './src/game/index.ts',
  output: {
    filename: 'game.bundle.js',
    path: path.resolve(__dirname, 'public/js'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@server': path.resolve(__dirname, 'src/server'),
      '@game': path.resolve(__dirname, 'src/game'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'assets/sprites'),
        glob: '*.png',
      },
      target: {
        image: path.resolve(__dirname, 'public/images/spritesheet.png'),
        css: path.resolve(__dirname, 'src/game/styles/sprites.css'),
      },
      apiOptions: {
        cssImageRef: '/images/spritesheet.png',
      },
    }),
  ],
  devtool: 'source-map',
};
