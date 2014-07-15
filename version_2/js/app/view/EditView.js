define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone){
	
	var EditView = Backbone.View.extend({
		el: $('#edit-container'),

		loggedIn: false,
		initialize: function() {
		},

	    render: function() {
			var target = this.el;
			$(target).empty();

			if(this.loggedIn == true)
			{
				$(target).append('<button type="button" id="delete" class="glyphicon glyphicon-thumbs-down btn btn-default btn-lrg pull-right"></button><button type="button" id="save" class="glyphicon glyphicon-thumbs-up btn btn-default btn-lrg pull-right"></button>');
			}

	        return this;
	    },

		events: {
		    'click button#delete': 'deleteEvent',
			'click button#save': 'saveEvent'
		},

		deleteEvent: function(e)
		{
			this.trigger( "deleteArticlesEvent", e );
		},

		saveEvent: function(e)
		{
			this.trigger( "saveArticlesEvent", e );
		},

		enableButtons: function() {
			this.loggedIn = true;
			this.render();
		},

		showSave: function() {
			$('#save').css('display','block');
		},

		hideSave: function() {
			$('#save').css('display','none');
		}
	});
	return EditView;
});