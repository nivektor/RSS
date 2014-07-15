define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone){
	
	var SortView = Backbone.View.extend({
		el: $('#sort-container'),

		initialize: function() {
		},

	    render: function() {
			var target = this.el;
			$(target).empty();
			$(target).append('<button type="button" class="pull-right" id="sort">Sort</button>');
			$(target).append('<button type="button" class="pull-right" id="all">ALL</button>');
	        return this;
	    },

		events: {
		    'click button#sort': 'clickEventSort',
			'click button#all': 'clickEventAll'
		},

		clickEventSort: function(e)
		{
			this.trigger( "toggleSortEvent", e );
		},

		clickEventAll: function(e)
		{
			$('.glyphicon-paperclip').addClass('bg-primary');
		}
	});
	return SortView;
});