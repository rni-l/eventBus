const path = require('path')
const pkg = require('./package.json')
const rootPath = path.resolve(__dirname)
const pluginName = pkg.pluginName
const ENV = process.env.NODE_ENV
const isDevelopment = ENV === 'development'


const entry = isDevelopment
  ? {
    app: path.resolve(rootPath, 'src', 'index.ts')
  }
  : {
    app: path.resolve(rootPath, 'src', `index.ts`)
  }

const output = isDevelopment
  ? {
    filename: 'index.js',
    path: path.resolve(rootPath, 'dist')
  }
  : {
    filename: `${pluginName}.js`,
    path: path.resolve(rootPath, 'dist'),
    library: {
      root: pluginName,
      amd: pluginName,
      commonjs: pluginName
    },
    libraryTarget: 'umd',
  }

const config = {
  mode: isDevelopment ? 'development' : 'production',

  entry,

  output,

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },

  devtool: false,

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(rootPath, 'src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
    ]
  },

  plugins: []
}

module.exports = config
