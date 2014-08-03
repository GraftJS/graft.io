module.exports = {
  cache: true,
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/,    loader: 'style!css' },
      { test: /\.png$/,    loader: 'file?prefix=images/' },
			{ test: /\.svg$/,    loader: 'file?prefix=images/' },
      
    ]
  },
  externals: {
    'pleasejs': 'Please'
  }
};
