<?php
	require_once 'globals.php';
	echo json_encode( $GLOBALS['feedProxy']->getFeeds() );	
?>

