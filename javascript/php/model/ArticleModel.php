<?php

class ArticleModel {
		
	public $id;
	public $guid;
	public $title;
	public $link;
	public $time;
	public $author;
	public $type;
	public $categories;
	public $teaser;
	public $image;

	public function ArticleModel($array) {	
		$this->id = $array['id'];
		$this->guid = $array['guid'];
		$this->title = $array['title'];
		$this->link = $array['link'];
		$this->time = $array['time'];
		$this->author = $array['author'];
		$this->type = $array['type'];
		$this->categories = $array['categories'];
		$this->teaser = $array['teaser'];
		$this->image = $array['image'];
	}
}

?>