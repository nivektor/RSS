define([
	'jquery', 
	'underscore', 
	'backbone',
	'ICanHaz',
	'JQueryHammer',
	'BackboneHammer',
	'Bootstrap',
	'JQueryCookie',
	'app/Controller', // Request router.js
], function($, _, Backbone, ich, Bootstrap, JQueryHammer, BackboneHammer, JQueryCookie, Router){
	var initialize = function(){
		// Pass in our Router module and call it's initialize function
		Router.initialize();
	};

	return { 
		initialize: initialize
	};
});