/**
* compile with google closure compiler
*/
var compiler = require('../../../closure/modules/compiler.js');

//result files
compiler.compile([
	'../../../../minified/sections/panel-controls/pagination.min.js'
]

//source files
,[
	'../../../../source-code/ui/panel/controls/pagination/pagination-controller.js'
	,'../../../../source-code/ui/panel/controls/pagination/pagination-view.js'
	,'../../../../source-code/ui/panel/controls/pagination/pagination-dto.js'
	,'../../../../source-code/ui/panel/controls/pagination-info/pagination-info-view.js'
]

//externs
,[
	'../../../closure/externs/jquery-1.7.externs.js'
	,'../../../closure/externs/jplist.addons.externs.js'
]

//don't set version in package.json
,false);