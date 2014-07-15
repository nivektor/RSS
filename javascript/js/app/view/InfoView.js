define([
	'jquery',
	'underscore',
	'backbone',
	'app/model/InfoModel',
], function($, _, Backbone, InfoModel){
	
	var InfoView = Backbone.View.extend({
		el: $('#info-container'),

		initialize: function(options) {
			this.model = new InfoModel(); 
			this.model.bind('change', this.render, this);
		},

	    render: function() {
			var target = this.el;
			$(target).empty();
			$(target).append('<p>'+this.model.attributes.currentFeedTitle+'</p>');
			$(target).append('<p>Last Update: '+this.model.attributes.lastImportTime+'</p>');
			// console.log('render')
	        return this;
	    },
	});
	return InfoView;
});