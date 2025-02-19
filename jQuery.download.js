/*
 * --------------------------------------------------------------------
 * jQuery-Plugin - $.download - allows for simple get/post requests for files
 * by Scott Jehl, scott@filamentgroup.com
 * http://www.filamentgroup.com
 * reference article: http://www.filamentgroup.com/lab/jquery_plugin_for_requesting_ajax_like_file_downloads/
 * Copyright (c) 2008 Filament Group, Inc
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * Updated 2022-08-30 by James Moberg - SunStar Media https://www.sunstarmedia.com/
 * --------------------------------------------------------------------
 */
 
jQuery.download = function(url, data, method, target){
	if (typeof target === 'undefined') { target = ''; }
	//url and data options required
	if( url && data ){
		//data can be string of parameters or array/object
		data = typeof data == 'string' ? data : jQuery.param(data);
		//split params into form inputs
		var inputs = '';
		jQuery.each(data.split('&'), function(){
			var pair = this.split('=');
			inputs+='<textarea type="hidden" name="'+ pair[0] +'">'+ pair[1] +'</textarea>';
		});
		//send request
		jQuery('<form action="'+ url +'" method="'+ (method||'post') +'" target="'+ target +'">'+inputs+'</form>')
		.appendTo('body').submit().remove();
	};
};
