define([
	'jquery',
	'underscore',
	'backbone',
	'ICanHaz',
	'DateFormat',
	'JQueryHammer',
	'BackboneHammer',
	'app/collection/ArticleCollection',
], function($, _, Backbone, ICanHaz, DateFormat, JQueryHammer, BackboneHammer, ArticleCollection){
	
	var ArticleView = Backbone.View.extend({
		el: $('#articles-container'),

		initialize: function(options) {
			this.collection = new ArticleCollection([]); 
			this.listenTo(this.collection, 'successOnFetch', this.successOnFetchEvent);
			this.collection.getResults();
			
			this.filterId = 0;
			this.loggedIn = false;
			this.listenTo(this.collection, 'reset', this.render);
			this.feedData = options.feedData;
		},

	    render: function(e) {
			var target = this.el,
			data = this.feedData;

			filteredList = this.collection.where({type: this.filterId});

			$(target).empty();

			if(this.filterId > 0)
			{
				this.renderCollection(filteredList, data, target);
			}
			else
			{
				this.renderCollection(this.collection.models, data, target);

				// <script src="js/lib/backbone.paginator.js"></script> **** *****************
				// $(target).append('<ul><li id="previous-page"><-</li></ul>');
				// $(target).append('<ul><li id="next-page">-></li></ul>');
			}
			if(this.loggedIn == true)
			{
				$('h4').append('<span class="btn-sm glyphicon glyphicon-paperclip"></span>');
			}

	        return this;

			// Hammer(el).on("doubletap", function() {
			    // alert('you doubletapped me!');
			// });
	    },

		events: {
			'click h4 a': 'toggleCollapse',
		    // 'click li#next-page': 'clickNext',
			// 'click li#previous-page': 'clickPrevious'
		},

		hammerEvents: {
			'dragend .panel': 'toggleDrag',
			'touch h4 .btn-sm': 'toggleTouch',
		    // 'click li#next-page': 'clickNext',
			// 'click li#previous-page': 'clickPrevious'
		},

		renderCollection: function(objs, data, target) {
			_.each(objs, function(model)
			{
				var feed = data.get(model.attributes.type);
				model.attributes.source = feed.attributes.parent + ' - ' + feed.attributes.title;
				model.attributes.title = model.attributes.title.substring(73, length);
				model.attributes.date = new Date(model.attributes.time * 1000).format('F j, Y, g:i a')
			});

			_.each(objs, function(model)
			{
				$(target).append(ich.articlesTemplate(model.attributes));

			});
		},

		toggleTouch: function(e) {

			if($(e.target).hasClass('bg-primary'))
			{
				$(e.target).removeClass('bg-primary');
			}
			else
			{
				$(e.target).addClass('bg-primary');
			}
		},

		toggleDrag: function(e) {
			if(this.loggedIn == true)
			{
				var title = $(e.target).parent().get(0),
				span = title.childNodes[1],
				input = span.childNodes[0];

				if(e.gesture.direction == 'right')
				{
					// $(input).attr('Checked','Checked'); 
					$(span).addClass('bg-primary');
				}
				if(e.gesture.direction == 'left')
				{
					// $(input).removeAttr('Checked');
					$(span).removeClass('bg-primary');
				}
			}
		},

		deleteItems: function(table) {
			var chkArray = this.getChecked();
			$.ajax({        
				type: "POST",
				url: "php/delete.php",
				data: {array: chkArray, table: table},
				// success: function() {
				// 		            $("#lengthQuestion").fadeOut('slow');        
				// 		       }
			    });
		},

		save: function(table) {
			var chkArray = this.getChecked();
			$.ajax({        
				type: "POST",
				url: "php/save.php",
				data: {array: chkArray, table: table},
				// success: function() {
				// 		            $("#lengthQuestion").fadeOut('slow');        
				// 		       }
			    });
		},

		getChecked: function() {
			var chkArray = [];
			$('.glyphicon-paperclip').each(function() {
				if($(this).hasClass('bg-primary'))
				{
					var span = $(this).parent().get(0),
					group = $(span).parent().get(0);
					chkArray.push($(group).find('a').attr('href'));
				}
			});

			this.collection.trigger( "removeModel", chkArray );
			console.log(chkArray)
			return chkArray;
		},

		toggleCollapse: function(e) {
			// console.log(e)
			var group = e.currentTarget.parentElement.parentElement.parentElement.parentElement,
			children = group.childNodes[1],
			collapse = $(children).find('.panel-collapse')
			$(collapse).collapse('toggle');
		},

		filterByFeed: function(e)
		{
			this.filterId = e;
			this.render();
		},

		enableEditing: function() {
			this.loggedIn = true;
			this.render();
		},

		toggleSort: function(e) {
			this.collection.setSortField('time', 'DESC');
			this.collection.sort();
			this.render();
		},

		successOnFetchEvent: function(e)
		{
			this.render();
			// this.trigger( "fetchComplete", e );
			// console.log(this.collection)
		},
		//
		// clickNext: function(e)
		// {
		// 	// console.log('click');
		// 	// this.trigger( "clickArticleEvent", e );
		// 	e.preventDefault();
		// 	this.collection.getNextPage();
		// 	this.render();
		// },
		// 
		// clickPrevious: function(e)
		// {
		// 	// console.log('click');
		// 	// this.trigger( "clickArticleEvent", e );
		// 	e.preventDefault();
		// 	this.collection.getPreviousPage();
		// 	this.render();
		// },
	});
	return ArticleView;
});