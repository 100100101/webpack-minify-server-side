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
