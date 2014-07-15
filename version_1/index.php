<?php
	require_once 'globals.php';
	require_once $local.'mvc/Application.php';
	$app = new Application();
	// $app = apc_fetch('rsstest');
	// var_dump(apc_fetch('rsstest')->ap);
?>
<!DOCTYPE html>
<html lang="en">
	<head>
    	<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <title>RSS</title>

	    <!-- Bootstrap -->
	    <link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<link href="lib/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet">
		<link href="style.css" rel="stylesheet">
  </head>
  <body>
	<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="index.php">RSS</a>
				<button type="button" onclick="deleteList()" id="delete" class="glyphicon glyphicon-thumbs-down btn btn-default btn-lrg pull-right"> Delete</button>
				<button type="button" onclick="saveList()" id="save" class="glyphicon glyphicon-thumbs-up btn btn-default btn-lrg pull-right"> Save</button> 
			</div>
			<div class="collapse navbar-collapse">
				<form class="navbar-form navbar-right" role="form" action="login.php" method="get">
		            <div class="form-group">
		              <input type="text" name="User" class="form-control">
		            </div>
		            <div class="form-group">
		              <input type="password" name="Password" class="form-control">
		            </div>
		            <button type="submit" class="btn btn-success">Sign in</button>
				</form>
				<ul class="nav navbar-nav">
					<li><a href="index-saved.php">Saved Articles</a></li>
					<?php $app->getFeedList(); ?>
				</ul>
			</div> <!--/.nav-collapse -->
		</div>
	</div>
	
	<div class="container">
		<div>
			<!-- <div id="txtHint"><b>Person info will be listed here.</b></div> -->
			<?php $app->getArticleList($_GET, 'entry'); ?>
		</div>
	</div><!-- /.container -->
	
	<!-- Modal -->
	<!-- <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> 
					<h4 class="modal-title" id="myModalLabel">Action</h4>
				</div>
				<div class="modal-body">
					<button type="button" onclick="saveItem()" class="glyphicon glyphicon-thumbs-up btn btn-default btn-lrg"> Save</button> 
					<button type="button" class="glyphicon glyphicon-envelope btn btn-default btn-lrg"> Email</button> 
					<button type="button" onclick="deleteItem()" id="delete" class="glyphicon glyphicon-thumbs-down btn btn-default btn-lrg"> Delete</button> 
				</div>
			</div>
		</div>
	</div> -->
	<script src="lib/functions.js"></script>
	<script src="lib/touchmouse.js"></script>
    <script src="lib/jquery.min.js"></script>
    <script src="lib/bootstrap/js/bootstrap.min.js"></script>
  </body>
</html>