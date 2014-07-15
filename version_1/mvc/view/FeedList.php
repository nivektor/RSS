<?php

require_once $local. 'mvc/view/Feed.php';

class FeedList {
	
	public function FeedList($models) {
		$this->createList($models);
	}
	
	private function createList($models) {
		echo'<ul class="nav navbar-nav">'.PHP_EOL;
		foreach($models as $model)
		{
			$feed = new Feed($model);
		}
		echo '</ul>'.PHP_EOL;
	}

}
?>