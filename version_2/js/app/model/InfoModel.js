define([
	'jquery',
	'underscore',
	'backbone',
	'DateFormat'
], function($, _, Backbone, DateFormat) {
  
	var InfoModel = Backbone.Model.extend({
		initialize: function () {
			this.bind( 'updateTitle', this.updateTitle, this );	
			this.bind( 'updateTime', this.updateTime, this );	
		},

		defaults: {
			lastImportTime: '',
			currentFeedTitle: ''
		},

		updateTitle: function(e)
		{
			this.set({
				currentFeedTitle: e
			});		
		},

		updateTime: function(e)
		{
			this.set({
				lastImportTime: new Date(e * 1000).format('F j, Y, g:i a')
			});
		},
	});

	return InfoModel;

});