/**
* compile with google closure compiler
*/
var compiler = require('../../../closure/modules/compiler.js');

//result files
compiler.compile([
	'../../../../minified/sections/panel-controls/range-slider.min.js'
]

//source files
,[
	'../../../../source-code/ui/panel/controls/jquery-ui-range-slider/range-slider-view.js'
	,'../../../../source-code/ui/panel/controls/jquery-ui-range-slider/range-slider-dto.js'
]

//externs
,[
	'../../../closure/externs/jquery-1.7.externs.js'
	,'../../../closure/externs/jplist.addons.externs.js'
]

//don't set version in package.json
,false);