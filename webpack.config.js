module.exports = {
  entry: './app',
  output: {
    path: 'dist',
    publicPath: '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader' }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
    'redux': 'Redux',
    'redux-thunk': 'ReduxThunk'
  },
  postcss: [
    require('autoprefixer')
  ],
  devtool: '#sourcemap',
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  }
}
