/**
 * 模板引擎
 * @name    template
 * @param filename   {String}            模板名
 * @param content   {Object, String}    数据。如果为字符串则编译并缓存编译结果
 * @return  {String, Function}  渲染好的HTML字符串或者渲染方法
 * 这块采用和artTmplete一致的处理方式
 */
 var mrTemplate = function (templateName, templeteData) {
    return typeof templeteData === 'string'
    ?   mrCompile(templeteData, {
            templateName: templateName
        })
    :   mrRenderFile(templateName, templeteData);
};
//定义模板引擎的版本号
mrTemplate.version = '1.0.0';
//定义配置文件
var defaultConfig = mrTemplate.defaultConfig = {
	openTag: '<%',    // 逻辑语法开始标签
    closeTag: '%>',   // 逻辑语法结束标签
    escape: true,     // 是否编码输出变量的 HTML 字符
    cache: true,      // 是否开启缓存（依赖 options 的 filename 字段）
    compress: false,  // 是否压缩输出
    parser: null      // 自定义语法格式器
};
//定义其他配置
var otherConfig = mrTemplate.otherConfig = {
	//定义页面中标签模板使用的名字
	tagForTemplete:'text/mr-template'
};
/**
 * 编译模板
 * @name    mrTemplate.mrCompile
 * @param   {String}    模板字符串
 * @param   {Object}    编译选项
 * @return  {Function}  渲染方法
 */
var mrCompile = mrTemplate.mrCompile = function(templateStr,options){
	//声明渲染函数
	var Rander = function(){

	};
	Rander.prototype.get = function(){

	};
	return Rander;
};

/*
*  保存缓存的模板
*  根据文件ID保存
*/
var cacheStorage = mrTemplate.cacheStorage =  {};
/*
*  正则管理器
*/
var patternManager = mrTemplate.patternManager = {
	//去除首尾空格
	spaceDel:/^\s*|\s*$/g
};
/*
*  获取模板 根据ID
*/
var getTmplete = mrTemplate.getTmplete = function(templateName){
	//定义缓存
	var cache;
	if(cacheStorage[templateName]){
        // 使用内存缓存
        cache = cacheStorage[templateName];
    }else if(typeof document === 'object'){
        // 加载模板并编译
        var elem = document.getElementById(templateName);
        if (elem) {
        	//获取源字符串
            var source = (elem.value || elem.innerHTML).replace(patternManager.spaceDel, '');
            cache = mrCompile(source, {
                templateName: templateName
            });
        }
    }
    return cache;
};
/**
 * 渲染模板(根据模板名)
 * @name    mrTemplate.mrRenderFile
 * @param   {String}    模板名
 * @param   {Object}    模板数据
 * @return  {String}    渲染好的字符串
 * 如果缓存中存在 直接读取缓存中代码
 * 如果缓存中不存在则直接读取ID获取
 */
var mrRenderFile = mrTemplate.mrRenderFile= function(templateName,templeteData){
	var func = getTmplete(templateName) || console.log('rander error\n' +'templateName is not exeit!');
	return templeteData ? func(templeteData) : func;
}