({
    baseUrl: ".",
	mainConfigFile: "main.js",
    paths: {
		"requireLib": "lib/require",
        "jquery": "lib/jquery-min",
		"underscore": "lib/underscore-min",
		"backbone": "lib/backbone-min",
		"ICanHaz": "lib/ICanHaz-min",
		"Bootstrap": "lib/bootstrap/js/bootstrap.min",
		"DateFormat": "lib/date.format",
		"JQueryHammer": "lib/jquery.hammer-full.min",
		"BackboneHammer": "lib/backbone.hammer",
		"JQueryCookie": "lib/jquery.cookie"
    },
    name: "main",
    out: "test-built.js",
	include: ["requireLib"]
})