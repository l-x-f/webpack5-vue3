const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const resolve = dir => path.join(__dirname, dir)

const staticDir = 'static'

module.exports = {
  entry: {
    main: resolve('./src/index.js')
  },
  watch: false,
  output: {
    filename: staticDir + '/js/[name].js',
    chunkFilename: staticDir + '/js/[name].js',
    path: resolve('dist')
  },
  resolveLoader: {
    modules: [
      'node_modules/@vue/cli-plugin-babel/node_modules',
      'node_modules',
      'node_modules/@vue/cli-service/node_modules'
    ]
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
    alias: {
      vue$: 'vue/dist/vue.runtime.esm-bundler.js',
      '@': resolve('src')
    }
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: resolve('node_modules/.cache/vue-loader')
            }
          },
          {
            loader: 'vue-loader',
            options: {
              cacheDirectory: resolve('node_modules/.cache/vue-loader'),
              babelParserPlugins: [
                'jsx',
                'classProperties',
                'decorators-legacy'
              ]
            }
          }
        ]
      },
      {
        test: /\.m?jsx?$/,
        include: resolve('/src/'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: resolve('node_modules/.cache/babel-loader')
            }
          },
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ],
        include: resolve('/src/'),
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'postcss-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true,
              // sass-loader version >= 8
              sassOptions: {
                indentedSyntax: true
              }
            }
          }
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({}),
    new CopyWebpackPlugin({
      patterns: [{ from: resolve('./src/static'), to: resolve('dist') }],
      options: {
        concurrency: 100
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devtool:
    !process.env.NODE_ENV === 'production' && 'eval-cheap-module-source-map',
  devServer: {
    open: true,
    host: 'localhost',
    hot: true,
    port: 8080
  }
}
