define([
	'jquery',
	'underscore',
	'backbone',
	'app/model/LoginModel',
], function($, _, Backbone, LoginModel){
	
	var LoginView = Backbone.View.extend({
		el: $('#login-container'),

		initialize: function(options) {
			this.model = new LoginModel(); 
			this.model.bind('change', this.render, this);
			this.listenTo(this, 'validLoginEvent', this.render);
			this.listenTo(this.model, 'successOnFetch', this.successOnFetchEvent);
		},

	    render: function() {
			var target = this.el;
			$(target).empty();
			$(target).append('<div class="navbar-form navbar-right" role="form" action="" method="get"><div class="form-group"><input type="text" name="user" class="form-control" autocapitalize="none"></div><div class="form-group"><input type="password" name="password" class="form-control" autocapitalize="none"></div><button type="submit" class="btn btn-success">Sign in</button></div>');

	        return this;
	    },

		events: {
		    'click button': 'clickEvent',
			'keydown': 'keyAction'
		},

		keyAction: function(e) {
			if(e.keyCode == 13)
			{
				this.testLogin();
			}
		},

		clickEvent: function()
		{
			this.testLogin();
		},

		testLogin: function() {
			var user = $('input:text[name=user]').val(),
			pw = $('input:password[name=password]').val();
			this.model.set('user', user);
			this.model.set('password' ,pw);
			this.model.getResults();
			
		},

		successOnFetchEvent: function(e) {
			var self = this;
			if( e == 'valid' )
			{
				this.model.set('loggedIn', true)
				self.trigger( "validLoginEvent", 'valid' );
			}
		}
	});
	return LoginView;
});