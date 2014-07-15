require.config({
	paths: {
		jquery: 'lib/jquery-min',
		underscore: 'lib/underscore-min',
		backbone: 'lib/backbone-min',
		ICanHaz: 'lib/ICanHaz-min',
		Bootstrap: 'lib/bootstrap/js/bootstrap.min',
		DateFormat: 'lib/date.format',
		JQueryHammer: 'lib/jquery.hammer-full.min',
		BackboneHammer: 'lib/backbone.hammer',
		JQueryCookie: 'lib/jquery.cookie'
		
	}

});

require([
	// Load our app module and pass it to our definition function
	'app',

], function(App){
	// The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
	App.initialize();
});