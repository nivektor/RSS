define([
	'jquery',
	'underscore',
	'backbone',
	'ICanHaz',
	'app/collection/FeedCollection',
], function($, _, Backbone, ICanHaz, FeedCollection){
	
	var FeedView = Backbone.View.extend({
		el: $('#feeds-container'),

		initialize: function() {
			this.collection = new FeedCollection([]); 
			this.listenTo(this.collection, 'successOnFetch', this.successOnFetchEvent);
			this.collection.getResults();
		},

	    render: function() {
			var target = this.el;
			$(target).empty();
			
			_.each(this.collection.models, function(model)
			{
				$('#feeds-container').append(ich.feedsTemplate(model.attributes));
				
			});
			$(target).append('<li><a href="#saved">Saved Articles</a></li>');

			return this;
	    },

		events: {
		    'click li a': 'clickEvent'
		},

		clickEvent: function(e)
		{
			this.collapseNav();
		},

		collapseNav: function(e) {
			$('#nav-collapse-login').collapse('hide');
		},

		successOnFetchEvent: function(e)
		{
			this.render();
			// this.trigger( "fetchComplete", e );
		}
	});
	return FeedView;
});