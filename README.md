# webpack-minify-server-side
webpack loader for minify server side scripts

Before:
```javascript
.
├── server
|	├── core
| 	|   ├── parts
| 	|	|   ├── require1.js
| 	|	|   └── require2.json
| 	|   └── enter_point.js /*require 'koa', 'require1.js' and 'require1.json'*/
| 	├── node_modules
| 	|   ├── bluebird
| 	|	|	├── ...
| 	|	|	...
| 	|	├── koa
| 	|	|	├── lib
| 	|	|	|	├── application.js
| 	|	|	|	├── context.js
| 	|	|	|	├── request.js
| 	|	|	|	└── response.js
| 	|	|	├── node_modules
| 	|	|	|	├── ...
| 	|	|	|	...
| 	|	|	├── History.md
| 	|	|	├── LICENSE
| 	|	|	├── package.json
| 	|	|	└── Readme.md
| 	|   └── pinkie
| 	|	|	├── ...
| 	|	|	...
| 	└── pinkie
├── webpack.config.js
└── index.html
```

After:
```javascript
.
├── server_minify
/*NOTE: all javascript code was minified babili module*/
|	├── core
| 	|   ├── parts
| 	|	|   ├── require1.js
| 	|	|   └── require2.json
| 	|   └── enter_point.js /*require 'koa', 'require1.js' and 'require1.json'*/
| 	├── node_modules
| 	|   ├── bluebird
| 	|	|	├── ...
| 	|	|	...
| 	|	├── koa
| 	|	|	├── lib
| 	|	|	|	├── application.js
| 	|	|	|	├── context.js
| 	|	|	|	├── request.js
| 	|	|	|	└── response.js
| 	|	|	├── node_modules
| 	|	|	|	├── ...
| 	|	|	|	...
| 	|	|	/*NOTE: not 'no require' files: History.md, LICENSE, Readme.md. Present package.json file, which is why it contains '{"main": "enter_point_file"}'*/
| 	|	|	└── package.json
| 	|   └── pinkie
| 	|	|	├── ...
| 	|	|	...
| 	└── pinkie
├── server
|	├── core
| 	|   ├── ...
|	|	...
| 	├── node_modules
| 	|   ├── ...
|	|	...
├── webpack.config.js
└── index.html
```

webpack.config.js:
```javascript
const
  NODE_ENV = /*JSON.parse(*/process.env.NODE_ENV || 'development'
  ,path = require('path')
  ,fs = require('fs')
  ,webpack = require('webpack')
  /*plugins*/
  ,BabiliPlugin = require('babili-webpack-plugin')
;

module.exports = webpack({
  context: __dirname,

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json']
  },

  entry: {
    bundle: './source/index.js'
  },

  output: {
    libraryTarget: 'commonjs2',
    library: '[name]',
    path: path.resolve(__dirname, './dist/'),
    publicPath: './dist/',
    filename: '[name].js',
  },

  target: 'node',

  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: "mock",
    __dirname: "mock",
    setImmediate: true
  },

  // externals: [
  //   (context, request, callback) => {
  //     let
  //       nodeModules = fs.readdirSync('node_modules')
  //       .filter((x) => {
  //         return ['.bin'].indexOf(x) === -1;
  //       }),
  //       pathStart = request.split('/')[0];
  // 
  //     if (nodeModules.indexOf(pathStart) >= 0) {
  //       return callback(null, 'commonjs ' + request);
  //     };
  //     callback();
  //   }
  // ],

  resolveLoader: {
    modulesDirectories: ['node_modules', '*'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  module: {
    preLoaders: [
      {
        test: /\.json$/,
        // exclude: /node_modules/,
        loader: 'json-loader'
      },

      {
        test: /\.js$|.json$/,
        loader: 'webpack-minify-server-side',
      },

    ],

    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'babel-preset-stage-0'],
          plugins: [
            'babel-plugin-transform-async-to-generator'
          ],
        },
      },

    ],

  },

  plugins: [],
})
```
