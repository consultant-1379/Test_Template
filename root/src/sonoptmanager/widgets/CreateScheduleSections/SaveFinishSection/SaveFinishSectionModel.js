define([
    'jscore/ext/mvp'
], function (mvp) {
    
    return mvp.Model.extend({

		getSelectedValue: function(){
            return this.getAttribute('selectedValue');
        },

        setSelectedValue: function(value){
            this.setAttribute('selectedValue', value);
        }
    });
    
});