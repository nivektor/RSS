define([
	'underscore',
	'backbone',
	'app/model/FeedModel'
], function(_, Backbone, FeedModel){

	var FeedCollection = Backbone.Collection.extend({
		model: FeedModel,
		url: "php/feeds.php",

	    initialize: function () {		
	    },

		getResults: function () {
			var self = this;
			this.fetch({
				reset: true,
				success: function (collection, response, options) {
					// you can pass additional options to the event you trigger here as well
					var lastImportTime = 0;
					_.each(collection.models, function(model)
					{
						var time = model.attributes.last_import;

						if(time > lastImportTime)
						{
							lastImportTime = time;
						}

					});
					self.trigger('successOnFetch', lastImportTime);
					// console.log('Load Feeds...');

				},
				error: function (collection, response, options) {
				// you can pass additional options to the event you trigger here as well
					self.trigger('errorOnFetch');
				}
			});
		},
	});

	return FeedCollection;

});