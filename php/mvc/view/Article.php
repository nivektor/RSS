<?php

class Article {
	
	public function Article($model, $titles) {
		$this->createArticle($model, $titles);
	}
	
	private function createArticle($model, $titles) {
		$id = $model->source - 1;
		// print_r($titles);
		// echo $id;
		echo '<div class="panel panel-default panel-'.$model->id.'">'.PHP_EOL;
		echo '<div class="panel-heading">'.PHP_EOL;
		echo '<h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#target-'.$model->id.'">'.$model->title.'</a></h4>';
		
		if(isset($_COOKIE["RSSLoginCookie"]) && $_COOKIE["RSSLoginCookie"] == 'Login')
		{
			// echo '<a onclick="showModal('.$model->id.')" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-record btn btn-default btn-sm"></span></a>'.PHP_EOL;
			echo '<span class="btn-sm"><input class="article-checkbox" value="'.$model->id.'" type="checkbox"></span>'.PHP_EOL;
		}
		
		echo '</div><div id="target-'.$model->id.'" class="panel-collapse collapse">'.PHP_EOL;
		echo '<a href="'.$model->link.'" target="_blank"><div class="panel-body">'.PHP_EOL;
		echo '<p>'.date("F j, Y, g:i a", $model->date).'<br>'.PHP_EOL;
		echo $titles[$id].'<br>'.PHP_EOL;
		echo $model->author.'<br>'.PHP_EOL;
		echo '<p>'.html_entity_decode($model->teaser).'</p>'.PHP_EOL;
		echo '</div></a></div></div>'.PHP_EOL;
	}

}
?>
