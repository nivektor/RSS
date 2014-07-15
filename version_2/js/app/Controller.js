define([
	'jquery',
	'underscore',
	'backbone',
	'JQueryCookie',
	'app/view/InfoView',
	'app/view/FeedView',
	'app/view/LoginView',
	'app/view/ArticleView',
	'app/view/SortView',
	'app/view/EditView',
], function($, _, Backbone, JQueryCookie, InfoView, FeedView, LoginView, ArticleView, SortView, EditView) {
  
	var AppRouter = Backbone.Router.extend({
		routes: {
			'all': 'allArticles',
			'filter/:id': 'filterArticles',
			'saved' : 'savedArticles'
		},
		
		startUp: function() {
			infoView = new InfoView();
			
			feedView = new FeedView();
			feedView.collection.on('successOnFetch', this.setLastImportTime);
			
			editView = new EditView();
			editView.on('deleteArticlesEvent', this.deleteArticlesHandler, this);
			editView.on('saveArticlesEvent', this.saveArticlesHandler, this);

			sortView = new SortView();
			sortView.on('toggleSortEvent', this.toggleSortHandler, this);
			
			loginView = new LoginView();
			loginView.on('validLoginEvent', this.validLoginHandler, this);
			
			articleView = new ArticleView({ feedData:feedView.collection });
			articleView.filterId = 0;
			
			loginView.render();
			editView.render();
			sortView.render();
			
			if($.cookie('RSSLoginCookie'))
			{
				this.validLoginHandler();
			}
		},
		
		setLastImportTime: function(e) {
			infoView.model.trigger('updateTime', e);
		},
		
		filterArticles: function(e) {
			var feed = feedView.collection.get(e);
			infoView.model.trigger('updateTitle', feed.attributes.parent + ' - ' + feed.attributes.title);
			articleView.collection.getResults();
			articleView.filterByFeed(e);
		},

		allArticles: function(e) {
			currentTable = 'entry';
			infoView.model.trigger('updateTitle', '');
			editView.showSave();
			articleView.collection.url = 'php/articles.php';
			articleView.collection.getResults();
			articleView.filterByFeed(0);
		},

		savedArticles: function() {
			currentTable = 'saved';
			infoView.model.trigger('updateTitle', '');
			editView.hideSave();
			articleView.collection.url = 'php/articles_saved.php';
			articleView.collection.getResults();
			articleView.filterByFeed(0);
		},

		deleteArticlesHandler: function(e) {
			articleView.deleteItems(currentTable);
		},

		saveArticlesHandler: function(e) {
			articleView.save(currentTable);
		},

		validLoginHandler: function(e) {
			this.loggedIn = true;
			feedView.collapseNav();
			editView.enableButtons();
			articleView.enableEditing();
			console.log('we are in '+this.loggedIn);
		},

		toggleSortHandler: function(e) {
			console.log('sort');
			articleView.toggleSort(e);
		}
	}),
  
	initialize = function(){
		console.log('RSS Initialize');
		var app_router = new AppRouter();
		app_router.startUp();
		
		Backbone.history.start();
	};
	
	return { 
		initialize: initialize
	};
});