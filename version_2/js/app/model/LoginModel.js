define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {
  
	var LoginModel = Backbone.Model.extend({
		url: 'php/login.php',

		initialize: function () {	
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
					self.trigger('successOnFetch', response);
				},
				error: function (collection, response, options) {
					self.trigger('errorOnFetch');
				}
			});
		},
	});

	return LoginModel;

});