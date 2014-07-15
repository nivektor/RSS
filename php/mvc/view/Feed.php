<?php

class Feed {
	
	public function Feed($model) {
		$this->createFeed($model);
	}
	
	private function createFeed($model) {
		echo '<li><a href="index.php?id='.$model->id.'">'.$model->parent.' - '.$model->title.'</a></li>'.PHP_EOL;
	}

}
?>