<?php
	require_once 'globals.php';
	echo json_encode( $GLOBALS['articleProxy']->getArticles(0, $GLOBALS['table']) );	
?>

