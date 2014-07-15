<?php
	require_once 'globals.php';
	
	// require_once('FirePHPCore/fb.php');

	
	if(isset($_REQUEST['array']))
	{
		foreach($_REQUEST['array'] as $id)
		{
			// fb($id, 'Label', FirePHP::INFO);
			$articleProxy->saveArticle($id, $_REQUEST['table']);
		}
	}
	
?>