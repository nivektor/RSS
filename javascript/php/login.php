<?php
require_once 'globals.php';
$user = $_GET['user'];
$pw = $_GET['pw'];

if($user == 'a' && $pw == 'a')
{
	ob_start();
	setcookie("RSSLoginCookie", 'Login', time()+3600, '/', $domain); // 1 hour
	echo json_encode('valid');
	// echo 'You are now logged in.';
	// echo '<a href="index.php">Click here</a> to continue.';
	// setcookie("RSSLoginCookie", 'Login', time()+60); // 1 minute
	ob_end_flush();
}
else
{
	echo json_encode('invalid');
}

?>