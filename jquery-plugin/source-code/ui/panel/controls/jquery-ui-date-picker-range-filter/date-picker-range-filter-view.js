/**
* jPList - jQuery Data Grid Controls ##VERSION## - http://jplist.com 
* Copyright 2014 Miriam Zusin. All rights reserved.
* For non-commercial, personal, or open source projects and applications, you may use jPList for free  http://www.binpress.com/license/read/id/2749/app/2085
* If your project generates any type of income, e.g. sells products, ads, services or just represents a commercial company, you should get a commercial license at http://www.binpress.com
*/
(function(){
	'use strict';		
		
	/**
	* Render control html
	* @param {Object} context
	*/
	var render = function(context){
		
		var controlOptions
			,options = {}
			,prev
			,next;
		
		//init vars
		controlOptions = context['controlOptions'];
		
		//init prev and next input fields
		prev = context.$control.find('[data-type="prev"]');
		next = context.$control.find('[data-type="next"]');
		
		//init data
		context.$control.data('jplist-datepicker-range-prev', prev);
		context.$control.data('jplist-datepicker-range-next', next);
		
		//init empty onchacnge
		prev.off().change(function(){
		
			if(jQuery.trim(jQuery(this).val()) === ''){
				context.history.addStatus(getStatus(context, false));
				context.observer.trigger(context.observer.events.forceRenderStatusesEvent, [false]);
			}
		});
		
		next.off().change(function(){
		
			if(jQuery.trim(jQuery(this).val()) === ''){
				context.history.addStatus(getStatus(context, false));
				context.observer.trigger(context.observer.events.forceRenderStatusesEvent, [false]);
			}
		});
		
		//init options
        options['onSelect'] = function(dateText, inst){
			context.history.addStatus(getStatus(context, false));
			context.observer.trigger(context.observer.events.forceRenderStatusesEvent, [false]);
		};
		
		if(controlOptions){		
			controlOptions['datepicker'](prev, options);
			controlOptions['datepicker'](next, options);
		}
	};
	
	/**
	* Get control status
	* @param {Object} context
	* @param {boolean} isDefault - if true, get default (initial) control status; else - get current control status
	* @return {jQuery.fn.jplist.app.dto.StatusDTO}
	*/
	var getStatus = function(context, isDefault){
		
		var status = null
			,data = null
			,prevDate = null
			,nextDate = null
			,dateTimeFormat
			,prev
			,next
			,dataPath
			,storageStatus;	
			
		storageStatus = context.$control.data('storage-status');
		
		if(isDefault && storageStatus){			
			status = storageStatus;
		}
		else{
		
			//get vars
			dataPath = context.$control.attr('data-path').toString();
			dateTimeFormat = context.$control.attr('data-datetime-format').toString();
			
			//get prev/next controls
			prev = context.$control.data('jplist-datepicker-range-prev');
			next = context.$control.data('jplist-datepicker-range-next');
			
			if(!isDefault){
				//get dates from datepickers
				prevDate = prev['datepicker']('getDate');
				nextDate = next['datepicker']('getDate');
			}
			
			data = new jQuery.fn.jplist.ui.controls.DatePickerRangeFilterDTO(dataPath, dateTimeFormat, prevDate, nextDate);		
			
			status = new jQuery.fn.jplist.app.dto.StatusDTO(
				context.name
				,context.action
				,context.type
				,data
				,context.inStorage
				,context.inAnimation
				,context.isAnimateToTop
				,context.inDeepLinking
			);	
		}
				
		return status;	
	};
	
	/**
	* Get deep link
	* @param {Object} context
	* @return {string} deep link
	*/
	var getDeepLink = function(context){
		
		var deepLink = ''
			,status
			,isDefault = false;
		
		if(context.inDeepLinking){
		
			//get status
			status = getStatus(context, isDefault);
			
			if(status.data){
				
				if(jQuery.isNumeric(status.data.prev_year) && jQuery.isNumeric(status.data.prev_month) && jQuery.isNumeric(status.data.prev_day)){
					
					//init deep link
					deepLink += context.name + context.options.delimiter0 + 'prev=' + status.data.prev_year + context.options.delimiter2 + status.data.prev_month + context.options.delimiter2 + status.data.prev_day;
				}
				
				if(jQuery.isNumeric(status.data.next_year) && jQuery.isNumeric(status.data.next_month) && jQuery.isNumeric(status.data.next_day)){
					
					if(deepLink !== ''){
						deepLink += context.options.delimiter1;
					}
					
					//init deep link
					deepLink += context.name + context.options.delimiter0 + 'next=' + status.data.next_year + context.options.delimiter2 + status.data.next_month + context.options.delimiter2 + status.data.next_day;
				}
			}
		}
		
		return deepLink;
	};
	
	/**
	* get status by deep link
	* @param {Object} context
	* @param {string} propName - deep link property name
	* @param {string} propValue - deep link property value
	* @return {jQuery.fn.jplist.app.dto.StatusDTO}
	*/
	var getStatusByDeepLink = function(context, propName, propValue){
		
		var isDefault = true
			,status = null
			,sections;
			
		if(context.inDeepLinking){
		
			//get status
			status = getStatus(context, isDefault);
			
			if(status.data){
			
				switch(propName){
					
					case 'prev':{	
						
						sections = propValue.split(context.options.delimiter2);
						
						if(sections.length === 3){
						
							status.data.prev_year = sections[0];
							status.data.prev_month = sections[1];
							status.data.prev_day = sections[2];
						}
					}
					break;
					
					case 'next':{
						
						sections = propValue.split(context.options.delimiter2);
						
						if(sections.length === 3){
						
							status.data.next_year = sections[0];
							status.data.next_month = sections[1];
							status.data.next_day = sections[2];
						}
					}
					break;
				}
			}
		}
		
		return status;
	};
	
	/**
	* Get control paths
	* @param {Object} context
	* @param {Array.<jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel>} paths
	*/
	var getPaths = function(context, paths){
	
		var jqPath
			,path;
		
		//init vars
		jqPath = context.$control.attr('data-path').toString();
		
		//init path
		if(jqPath){
		   
			path = new jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel(jqPath, 'datetime');
			paths.push(path);
		}	
	};
		
	/**
	* Set control status
	* @param {Object} context
	* @param {jQuery.fn.jplist.app.dto.StatusDTO} status
	* @param {boolean} restoredFromStorage - is status restored from storage
	*/
	var setStatus = function(context, status, restoredFromStorage){
				
		var prevDate
			,nextDate
			,$prev
			,$next;

		//savestorages status
		if(context.inStorage && restoredFromStorage){			
			context.$control.data('storage-status', status);	
		}
		
		//get prev/next controls
		$prev = context.$control.data('jplist-datepicker-range-prev');
		$next = context.$control.data('jplist-datepicker-range-next');
		
		if(jQuery.isNumeric(status.data.prev_year) && 
			jQuery.isNumeric(status.data.prev_month) && 
			jQuery.isNumeric(status.data.prev_day)){
		
			//init dates
			prevDate = new Date(status.data.prev_year, status.data.prev_month, status.data.prev_day);	
			$prev['datepicker']('setDate', prevDate);
		}
		else{
			$prev.val('');
		}
		
		if(jQuery.isNumeric(status.data.next_year) && 
			jQuery.isNumeric(status.data.next_month) && 
			jQuery.isNumeric(status.data.next_day)){
			
			nextDate = new Date(status.data.next_year, status.data.next_month, status.data.next_day);
			$next['datepicker']('setDate', nextDate);
		}
		else{				
			$next.val('');
		}
	};
	
	/** 
	* Dropdown control: sort dropdown, filter dropdown, paging dropdown etc.
	* @constructor
	* @param {Object} context
	*/
	var Init = function(context){
				
		//render control
		render(context);
		
		return jQuery.extend(this, context);
	};
	
	/**
	* Get control status
	* @param {boolean} isDefault - if true, get default (initial) control status; else - get current control status
	* @return {jQuery.fn.jplist.app.dto.StatusDTO}
	*/
	Init.prototype.getStatus = function(isDefault){
		return getStatus(this, isDefault);
	};
	
	/**
	* Get Deep Link
	* @return {string} deep link
	*/
	Init.prototype.getDeepLink = function(){
		return getDeepLink(this);
	};
	
	/**
	* Get Paths by Deep Link
	* @param {string} propName - deep link property name
	* @param {string} propValue - deep link property value
	* @return {jQuery.fn.jplist.app.dto.StatusDTO}
	*/
	Init.prototype.getStatusByDeepLink = function(propName, propValue){
		return getStatusByDeepLink(this, propName, propValue);
	};
	
	/**
	* Get Paths
	* @param {Array.<jQuery.fn.jplist.domain.dom.models.DataItemMemberPathModel>} paths
	*/
	Init.prototype.getPaths = function(paths){
		getPaths(this, paths);
	};
	
	/**
	* Set Status
	* @param {jQuery.fn.jplist.app.dto.StatusDTO} status
	* @param {boolean} restoredFromStorage - is status restored from storage
	*/
	Init.prototype.setStatus = function(status, restoredFromStorage){
		setStatus(this, status, restoredFromStorage);
	};
	
	/** 
	* jQuery UI date pciker range filter controller
	* @constructor
	* @param {Object} context
	*/
	jQuery.fn.jplist.ui.controls.DatePickerRangeFilter = function(context){
		return new Init(context);
	};	
	
	/**
	* static control registration
	*/
	jQuery.fn.jplist.controlTypes['date-picker-range-filter'] = {
		className: 'DatePickerRangeFilter'
		,options: {}
	};	
})();

