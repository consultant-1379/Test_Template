define([
	'jscore/ext/mvp'
], function (mvp) {

	return mvp.Model.extend({
		
		init: function(options){
			this.options = options;
		}

	});

});