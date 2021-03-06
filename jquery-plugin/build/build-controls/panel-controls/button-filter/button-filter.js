/**
* compile with google closure compiler
*/
var compiler = require('../../../closure/modules/compiler.js');

//result files
compiler.compile([
	'../../../../minified/sections/panel-controls/button-filter.min.js'
]

//source files
,[
	'../../../../source-code/ui/panel/controls/button-filter/button-filter-view.js'
	,'../../../../source-code/ui/panel/controls/button-filter/button-filter-group-view.js'
]

//externs
,[
	'../../../closure/externs/jquery-1.7.externs.js'
	,'../../../closure/externs/jplist.addons.externs.js'
]

//don't set version in package.json
,false);