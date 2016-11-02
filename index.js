const
  path = require('path'),
  fs = require('fs-extra'),
  // json5 = require('json5'),
  loaderUtils = require('loader-utils'),
  /**/
  babelCore = require('babel-core')
;
// Identity loader
module.exports = function(source, map) {
  this.cacheable && this.cacheable();
	if(!this.emitFile) throw new Error('emitFile is required from module system');

  let
    filePathParse = path.parse(this.resource/*resourcePath*/)
    ,fileDir = filePathParse.dir
    ,fileName = filePathParse.name
    ,fileExt = filePathParse.ext
    ,fileBase = filePathParse.base
    ,outputPath  = path.resolve(this.options.output.path)
    ,contextPath = path.resolve(this.options.context)
    /**/
  	,query = loaderUtils.parseQuery(this.query)
  	,configKey = query.config || 'fileLoader'
  	,options = this.options[configKey] || {}
    /**/
    ,config = {
		publicPath: false,
		name: /*'[name].[hash].[ext]'*/'[name].[ext]'
	  }
  ;

  let
    sourceBaseDir = path.dirname(path.join(this.options.context, this.options.entry.bundle))

    ,distRootPath = this.options.output.path
    ,distBase = path.join(distRootPath, fileDir.replace(/*sourceBaseDir*/this.options.context, ''))

    ,distFilePath = path.format({
      dir: path.relative(distRootPath, distBase),
      name: fileName,
      ext: fileExt
    })
  ;


  let
    fileDirArr = fileDir.split(path.sep)
    ,fileDirArrLength = fileDirArr.length
    ,fileDirNode_modulesLastIndex = fileDirArr.lastIndexOf('node_modules')

    ,rootPackageJSON = (() => {
      if(fileDirNode_modulesLastIndex === -1){
        return false;
      }

      return fileDirArr.slice(0, fileDirNode_modulesLastIndex + 2).join(path.sep);

    })()
  ;

  if(rootPackageJSON){
    let
      pathPackageJSON_from = path.join(rootPackageJSON, 'package.json')
      ,pathPackageJSON_to = path.join(outputPath, pathPackageJSON_from.replace(contextPath, ''))
    ;


    fs.exists(pathPackageJSON_from, (exist) => {
      if(exist){
        // console.log('exist');
        fs.copySync(pathPackageJSON_from, pathPackageJSON_to);
        // fs.createReadStream(pathPackageJSON_from).pipe(fs.createWriteStream(pathPackageJSON_to));
      }
      else{
        // console.log('not exist');
      }
    });

  }

	// options takes precedence over config
	Object.keys(options).forEach(function(attr) {
		config[attr] = options[attr];
	});

	// query takes precedence over config and options
	Object.keys(query).forEach(function(attr) {
		config[attr] = query[attr];
	});


	var url = loaderUtils.interpolateName(this, config.name, {
		context: config.context || this.options.context,
		source,
		regExp: config.regExp
	});



	var publicPath = `__webpack_public_path__ + ${JSON.stringify(url)}`;

  // var
  //   value;
  // try {
  //   value = JSON.stringify(JSON.parse(source));
  //
  //   return `module.exports =  ${publicPath};`;
  //
  // } catch (error) {
  //   console.log('error');
  //   value = source;
  //   this.callback(null, value, map);
  // } finally {
  //   source = value;
  //   this.emitFile(distFilePath, source);
  //
  // }
  if(fileExt === '.js'){
    source = babelCore.transform(source, {
      sourceType: 'script',
      minified: true,
      comments: false,
      presets: ['babili']
    }).code
  }

  this.emitFile(distFilePath, source);


  if(fileExt === '.json'){
    // source = JSON.stringify(JSON.parse(source));
    source = `module.exports =  ${publicPath};`;
  }


  this.callback(null, source, map);

};

// module.exports.raw = true;
