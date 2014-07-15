<?php
	require_once 'globals.php';
	// require_once('FirePHPCore/fb.php');

	// fb($_REQUEST, 'Label', FirePHP::INFO);
	
	$time = $GLOBALS['articleProxy']->getLatestTime();
	echo json_encode( $time );	
	

?>

