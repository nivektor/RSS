// Filename: router.js
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
			// var feed = feedCollection.where({id: e});
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


// 
// 
// App.RSS = Backbone.Router.extend({
// 	info: null,
// 	login: null,
// 	editView: null,
// 	loginView: null,
// 	feedCollection: null,
// 	feedView: null,
// 	infoView: null,
// 	articleCollection: null,
// 	articleView: null,
// 	feedCollection: null,
// 	sortView: null,
// 	loggedIn: null,
// 	chkArray: null,
// 	currentTable: null,
// 	latestTime: null,
// 
// 	routes: {
// 		'all': 'allArticles',
// 		'filter/:id': 'filterArticles',
// 		'saved' : 'savedArticles'
// 	  },
// 
// 	initialize: function() {
// 		console.log('RSS Initialize');
// 		loggedIn = false;
// 		currentTable = 'entry';
// 		chkArray = [];
// 		
// 		info = new App.Info();
// 		login = new App.Login();
// 		feedCollection = new App.FeedCollection();
// 		articleCollection = new App.ArticleCollection();
// 		
// 		feedCollection.on('successOnFetch', this.setLastImportTime)
// 		feedCollection.getResults();
// 		articleCollection.getResults();
// 		
// 		loginView =  new App.LoginView({model: login, el: '#login-container'});
// 		
// 		feedView = new App.FeedView({collection: feedCollection, el: '#feeds-containter'});
// 		
// 		infoView =  new App.InfoView({model: info, el: '#info-container'});
// 		
// 		sortView = new App.SortView({el: '#sort-container'});
// 		
// 		editView = new App.EditView({el: '#header-container'});
// 		editView.on('deleteArticlesEvent', this.deleteArticlesHandler, this);
// 		editView.on('saveArticlesEvent', this.saveArticlesHandler, this);
// 		loginView.on('validLoginEvent', this.validLoginHandler, this);
// 		sortView.on('toggleSortEvent', this.toggleSortHandler, this);
// 		
// 		articleView = new App.ArticleView({ collection: articleCollection, el: '#articles-containter', feedData:feedCollection });
// 		articleView.filterId = 0;
// 
// 		this.appStartUp();
// 	},
// 	
// 	appStartUp: function() {		
// 		editView.render();
// 		loginView.render();
// 		sortView.render();
// 		if($.cookie('RSSLoginCookie'))
// 		{
// 			this.validLoginHandler();
// 		}
// 		// feedView.render();
// 		// infoView.render();
// 		// articleView.render(); // called by reset in view
// 	},
// 	
// 	filterArticles: function(e) {
// 		// var feed = feedCollection.where({id: e});
// 		var feed = feedCollection.get(e);
// 		info.trigger('updateTitle', feed.attributes.parent + ' - ' + feed.attributes.title);
// 		articleCollection.getResults();
// 		articleView.filterByFeed(e);
// 	},
// 	
// 	allArticles: function(e) {
// 		currentTable = 'entry';
// 		articleCollection.url = 'php/articles.php';
// 		info.trigger('updateTitle', '');
// 		articleCollection.getResults();
// 		editView.showSave();
// 		articleView.filterByFeed(0);
// 	},
// 	
// 	savedArticles: function() {
// 		currentTable = 'saved';
// 		articleCollection.url = 'php/articles_saved.php';
// 		info.trigger('updateTitle', '');
// 		articleCollection.getResults();
// 		editView.hideSave();
// 		articleView.filterByFeed(0);
// 	},
// 	
// 	deleteArticlesHandler: function(e) {
// 		articleView.deleteItems(currentTable);
// 	},
// 	
// 	saveArticlesHandler: function(e) {
// 		articleView.save(currentTable);
// 	},
// 	
// 	validLoginHandler: function(e) {
// 		this.loggedIn = true;
// 		feedView.collapseNav();
// 		editView.enableButtons();
// 		articleView.enableEditing();
// 		console.log('we are in '+this.loggedIn);
// 	},
// 	
// 	setLastImportTime: function(e) {
// 		info.trigger('updateTime', e);
// 	},
// 	
// 	toggleSortHandler: function(e) {
// 		console.log('sort');
// 		articleView.toggleSort(e);
// 	}
// 	
// });