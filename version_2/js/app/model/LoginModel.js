define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {
  
	var LoginModel = Backbone.Model.extend({
		url: 'php/login.php',

		initialize: function () {
			this.bind( 'updateTitle', this.updateTitle, this );	
			this.bind( 'updateTime', this.updateTime, this );	
		},

		defaults: {
			user: '',
			password: '',
			loggedIn: false
		},

		getResults: function () {
			var self = this;
			this.url = this.url + '?user=' + this.attributes.user + '&pw=' + this.attributes.password;

			this.fetch({
				reset: true,
				success: function (collection, response, options) {
					// you can pass additional options to the event you trigger here as well
					self.trigger('successOnFetch', response);
				},
				error: function (collection, response, options) {
				// you can pass additional options to the event you trigger here as well
					self.trigger('errorOnFetch');
				}
			});
		},
	});

	return LoginModel;

});