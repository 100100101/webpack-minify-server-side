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
