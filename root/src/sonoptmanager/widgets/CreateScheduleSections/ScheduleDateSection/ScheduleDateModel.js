define([ "jscore/ext/mvp" ], function(mvp) {

	return mvp.Model.extend({

		setSelectedDateMillSecs : function(time_in_milliseconds) {
            this.setAttribute('time_in_milliseconds', time_in_milliseconds);
		},
            
        getSelectedDateMillSecs : function() {
              return this.getAttribute('time_in_milliseconds');
        }

	});

});