<?php
	global $connect,$local, $domain, $articleProxy, $feedProxy;
	$connect = mysql_connect("localhost","root","root");
	$local = $_SERVER["DOCUMENT_ROOT"].'GIT/nivektor/RSS/version_2/php/';
	$domain = 'localhost';
	
	$table = 'entry';
	
	require_once $local.'model/FeedProxy.php';
	require_once $local.'model/ArticleProxy.php';
	$feedProxy = new FeedProxy($connect);
	$articleProxy = new ArticleProxy($connect);
	
	// require_once('FirePHPCore/fb.php');

	// fb($id, 'Label', FirePHP::INFO);
?>
