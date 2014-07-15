<?php
	require_once 'globals.php';
	// require_once('FirePHPCore/fb.php');

	// fb($_REQUEST, 'Label', FirePHP::INFO);
	
	if(isset($_REQUEST['array']))
	{
		foreach($_REQUEST['array'] as $id)
		{
			$articleProxy->deleteArticle($id, $_REQUEST['table']);
		}
	}
	

?>

