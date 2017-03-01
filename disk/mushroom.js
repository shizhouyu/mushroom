/*!
* 框架js
* @version 1.0.0
*
* 作者：mushroom team
* 框架名 MPT
*
* BUILT: 2017/2/20
*/
;(function(root,fn){//root window fn函数
	//amd 模块扩展
	if(typeof define === 'function' && define.amd) {
		define(function(){
		  return fn(root, root.document)
		});
	 } else if (typeof exports === 'object') {
		module.exports = root.document ? fn(root, root.document) : function(w){ return fn(w, w.document) }
	 } else {
		fn(root, root.document);
	 }
}(typeof window !== "undefined" ? window : this, function(window, document) {
	//定义模块地图 临时拷贝到全局
	var moduleMap = window.moduleMap = {};
	//加载的js文件的map数组
	var fileMap = {};
	//定义一个缓存的函数
    var noop = function () {
    };
	//定义框架名字
	structure = window.mushroom = window.mr = {
		/*
		* 模块定义函数
		* name 模块名 dependencies 依赖 factory 回调函数
		*/
		define: function(name, dependencies, factory) {
			//如果模块里面没有 创建一个模块 负责直接返回
			if (!moduleMap[name]) {
				var module = {
					name: name,
					dependencies: dependencies,
					factory: factory
				};
				moduleMap[name] = module;
			}
			//返回模块
			return moduleMap[name];
		},
		//使用模块 参数模块名
		use: function(name) {
			//找到相应的模块
			var module = moduleMap[name];
			//生成模块的实体函数 就是factory函数
			if (!module.entity) {
				var args = [];
				//循环依赖下面的所有实例
				for (var i=0; i<module.dependencies.length; i++) {
					//如果实体函数存在
					if (moduleMap[module.dependencies[i]].entity) {
						//追加到数组中
						args.push(moduleMap[module.dependencies[i]].entity);
					}else {
						//把新生成的实体 放入数组中
						args.push(this.use(module.dependencies[i]));
					}
				}
				//实体函数赋值 
				module.entity = module.factory.apply(noop, args);
			}
			return module.entity;
		},
		//加载js require
		require: function (pathArr, callback) {
			//循环加载js数组
            for (var i = 0; i < pathArr.length; i++) {
                var path = pathArr[i];
                if (!fileMap[path]) {
                    var head = document.getElementsByTagName('head')[0];
                    var node = document.createElement('script');
                    node.type = 'text/javascript';
                    node.async = 'true';
                    node.src = path + '.js';
                    node.onload = function () {
                        fileMap[path] = true;
                        head.removeChild(node);
                        checkAllFiles();
                    };
                    head.appendChild(node);
                }
            }
			//检查所有js是否全部加载 是的话 调用回调函数
            function checkAllFiles() {
                var allLoaded = true;
                for (var i = 0; i < pathArr.length; i++) {
                    if (!fileMap[pathArr[i]]) {
                        allLoaded = false;
                        break;
                    }
                }
                if (allLoaded) {
                    callback();
                }
            }
        }
	};

	/**
	 * 模板引擎
	 * @name    template
	 * @mobaName   {String}            模板名
	 * @cont   {Object, String}    数据。如果为字符串则编译并缓存编译结果
	 * @return  {String, Function}  渲染好的HTML字符串或者渲染方法
	 */
	structure.templete = function(mobaName,cont){
		if(typeof cont === 'string'){

		} 
	}
}));