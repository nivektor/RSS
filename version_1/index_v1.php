<?php
	$connect = mysql_connect("localhost","root","root");
	$local = $_SERVER["DOCUMENT_ROOT"].'RSS2/';
	$domain = "dev.vektor-online.com";
	$dateMax = apc_fetch('dateMax');

	require_once $local.'mvc/model/RSSImportProxy.php';
	require_once $local.'mvc/model/ArticleProxy.php';
	require_once $local.'mvc/model/FeedProxy.php';
	require_once $local.'mvc/view/FeedList.php';
	require_once $local.'mvc/view/ArticleList.php';
	
	// !!!!!!!!!!  On Import store highest timestamp :: On import only import after previous timestamp
	
	// $ri = new RSSImportProxy($connect, $dateMax);
	$fp = new FeedProxy($connect);
	$ap = new ArticleProxy($connect);
	$fp->getFeeds();
	$get = 0;
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
		<script>
			var id;
	
			function showModal(str) {
				id = str;
				// alert('SEND '+id);
			}
			function deleteItem() {
				// alert('SEND '+id);
		
				if (id=="") {
				    document.getElementById("txtHint").innerHTML="";
				    return;
				} 
				if (window.XMLHttpRequest) {
				    // code for IE7+, Firefox, Chrome, Opera, Safari
				    xmlhttp=new XMLHttpRequest();
				} else { // code for IE6, IE5
				    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlhttp.onreadystatechange=function() {
					// if (xmlhttp.readyState==4 && xmlhttp.status==200) {
					// 	document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
					// }
				}
				xmlhttp.open("GET","mvc/control/delete.php?id="+id,true);
				xmlhttp.send();
				$(".panel-"+id).css("display","none");
				$('#myModal').modal('hide');
			}
			function saveItem() {
				// alert('SEND '+id);
		
				if (id=="") {
				    document.getElementById("txtHint").innerHTML="";
				    return;
				} 
				if (window.XMLHttpRequest) {
				    // code for IE7+, Firefox, Chrome, Opera, Safari
				    xmlhttp=new XMLHttpRequest();
				} else { // code for IE6, IE5
				    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlhttp.onreadystatechange=function() {
					// if (xmlhttp.readyState==4 && xmlhttp.status==200) {
					// 	document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
					// }
				}
				xmlhttp.open("GET","mvc/control/save.php?id="+id,true);
				xmlhttp.send();
				$(".panel-"+id).css("display","none");
				$('#myModal').modal('hide');
			}
		</script>
  </head>
  <body>
	<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="index.php">RSS</a> 
			</div>
			<div class="collapse navbar-collapse">
				<form class="navbar-form navbar-right" role="form" action="mvc/control/login.php" method="get">
		            <div class="form-group">
		              <input type="text" name="User" class="form-control">
		            </div>
		            <div class="form-group">
		              <input type="password" name="Password" class="form-control">
		            </div>
		            <button type="submit" class="btn btn-success">Sign in</button>
				</form>
				<ul class="nav navbar-nav">
					<?php $fl = new FeedList($fp->feedData); ?>
				</ul>
			</div> <!--/.nav-collapse -->
		</div>
	</div>
	
	<div class="container">
		<div>
			<!-- <div id="txtHint"><b>Person info will be listed here.</b></div> -->
			<?php
				// echo $_COOKIE["RSSLoginCookie"];	
				echo '<p>Lastest Article Time: '.date("F j, Y, g:i a", $dateMax);	
				foreach($_GET as $key=>$value){
					if($value > 0) {
						// echo $value;
						$get = 1;
					}
				}
				if($get == 0)
				{
					$value = 0;
					$al = new ArticleList($ap->getArticles($value), $fp->feedTitles);
					// echo $ap->dateMax;
					apc_store('dateMax',$ap->dateMax);
					// print_r($fp->feedData);
				}
				else
				{
					// echo $fp->feedTitles[$value - 1];
					// print_r ($fp->feedTitles);
					$al = new ArticleList($ap->getArticles($value), $fp->feedTitles);
				}
			?>
		</div>
	</div><!-- /.container -->
	
	<!-- Modal -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
	</div>

    <script src="lib/jquery.min.js"></script>
    <script src="lib/bootstrap/js/bootstrap.min.js"></script>
  </body>
</html>