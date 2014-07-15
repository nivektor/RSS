define([
	'underscore',
	'backbone'
], function(_, Backbone) {
  
	var FeedModel = Backbone.Model.extend({
		initialize: function () {
			this.bind( 'updateModel', this.update, this );	
		},

		update: function(e)
		{
			this.set({
				id: e.attributes.id,
				url: e.attributes.url,
				title: e.attributes.title,
				parent: e.attributes.parent,
				enabled: e.attributes.enabled,
				last_import: e.attributes.last_import
			});
		},
	});

	return FeedModel;

});