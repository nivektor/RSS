<?php
	global $connect,$local, $domain;
	$connect = mysql_connect("localhost","root","root");
	$local = $_SERVER["DOCUMENT_ROOT"].'GIT/nivektor/RSS/version_1/';
	$domain = 'localhost';
	
	// $saved = $_GET['saved'];
	$table = 'entry';
?>
