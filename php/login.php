<?php
require_once './globals.php';
$user = $_GET['User'];
$pw = $_GET['Password'];

if($user == 'nivek' && $pw == 'xanadu')
{
	ob_start();
	setcookie("RSSLoginCookie", 'Login', time()+3600, '/', $domain); // 1 hour
	echo 'You are now logged in.';
	echo '<a href="index.php">Click here</a> to continue.';
	// setcookie("RSSLoginCookie", 'Login', time()+60); // 1 minute
	ob_end_flush();
}
else
{
	echo 'Invalid Login.';
}

?>