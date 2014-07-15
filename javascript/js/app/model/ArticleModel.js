define([
	'jquery',
	'underscore',
	'backbone',
	'DateFormat'
], function($, _, Backbone, DateFormat) {
  
	var ArticleModel = Backbone.Model.extend({
		initialize: function () {
			this.bind( 'updateModel', this.update, this );	
		},

		update: function(e)
		{
			// console.info(e);
			this.set({
				id: e.attributes.id,
				guid: e.attributes.guid,
				type: e.attributes.type,
				time: e.attributes.time,
				date: e.attributes.date,
				link: e.attributes.link,
				title: e.attributes.title,
				author: e.attributes.author,
				teaser: e.attributes.teaser,
				categories: e.attributes.categories,
				source: e.attributes.source,
				image: e.attributes.image
			});
		},
	});

	return ArticleModel;

});