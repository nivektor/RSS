<?php
	require_once './globals.php';
	require_once './mvc/model/ArticleProxy.php';
	
	$id = $_GET['id'];
	$ap = new ArticleProxy($connect);	
	$ap->saveArticle($id);
?>