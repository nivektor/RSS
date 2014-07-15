define([
	'underscore',
	'backbone',
	'app/model/ArticleModel'
], function(_, Backbone, ArticleModel){

	var ArticleCollection = Backbone.Collection.extend({
		model: ArticleModel,
		url: "php/articles.php",

	    initialize: function () {
			this.bind( 'removeModel', this.onRemoveModel, this );	
			this.sortField = 'time';
			this.sortDirection = 'ASC';	
	    },


		setSortField: function (field, direction) {
			if(this.sortDirection == 'ASC')
			{
				this.sortDirection = 'DESC';
				return;
			}
			if(this.sortDirection == 'DESC')
			{
				this.sortDirection = 'ASC';
				return;
			}
		},

		comparator: function (m) {
			return m.get(this.sortField);
		},

		sortBy: function (iterator, context) {
			var obj = this.models,
			direction = this.sortDirection;

			return _.pluck(_.map(obj, function (value, index, list) {
				return {
					value: value,
					index: index,
					criteria: iterator.call(context, value, index, list)
				};
			}).sort(function (left, right) {
				// swap a and b for reverse sort
				var a = direction === "ASC" ? left.criteria : right.criteria,
				b = direction === "ASC" ? right.criteria : left.criteria;

				if (a !== b) {
					if (a > b || a === void 0) return 1;
					if (a < b || b === void 0) return -1;
				}
				return left.index < right.index ? -1 : 1;
			}), 'value');
		},

		getResults: function () {
			var self = this;
			this.fetch({
				reset: true,
				success: function (collection, response, options) {
					self.trigger('successOnFetch');
				},
				error: function (collection, response, options) {
					self.trigger('errorOnFetch');
				}
			});
		},

		onRemoveModel: function(event) {
			for (x in event) 
			{
				var itemToRemove = this.find(function(item){return item.get("id") === event[x];});

				if(itemToRemove) 
				{
				    this.remove(itemToRemove);
				}
			}
			this.reset(this.models);
		},
	});

	return ArticleCollection;

});