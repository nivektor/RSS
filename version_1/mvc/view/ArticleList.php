<?php

require_once $local. 'mvc/view/Article.php';

class ArticleList {
	
	public function ArticleList($models, $titles) {
		$this->createList($models, $titles);
		// print_r($models);
	}
	
	private function createList($models, $titles) {
		echo'<div class="panel-group" id="accordion">'.PHP_EOL;
		foreach($models as $model)
		{
			$feed = new Article($model, $titles);
		}
		echo '</div>'.PHP_EOL;
	}

}
?>