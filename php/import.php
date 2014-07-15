<?php
	require_once './globals.php';
	require_once $local.'mvc/Application.php';
	$app = new Application();
	$app->importRSS();
	// apc_store('rsstest', $app);
?>
