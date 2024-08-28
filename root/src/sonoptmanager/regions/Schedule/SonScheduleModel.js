//The Schedule will be stored in this model
define([
	'jscore/ext/mvp',
    '../../../global'
], function (mvp, global) {
	'use strict';
	return mvp.Model.extend({

        url: global.modelOptions.scheduleBaseURL,

    	setSelectedURL : function(urlValue) {
            this.setAttribute('urlValue', urlValue);
		},
            
        getSelectedURL : function() {
              return this.getAttribute('urlValue');
        },

        setExecutionMode: function(executionMode) {
            this.setAttribute('executionMode', executionMode);
        },

        getExecutionMode: function() {
            return this.getAttribute('executionMode');
        },
       
        setSelectedDateMillSecs : function(time_in_milliseconds) {
            this.setAttribute('time_in_milliseconds', time_in_milliseconds);
		},
            
        getSelectedDateMillSecs : function() {
              return this.getAttribute('time_in_milliseconds');
        }
        
         
    });

});