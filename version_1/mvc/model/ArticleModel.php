<?php

class ArticleModel {
		
	public $id;
	public $guid;
	public $title;
	public $link;
	public $date;
	public $author;
	public $source;
	public $categories;
	public $teaser;

	public function ArticleModel($array) {	
		$this->id = $array['id'];
		$this->guid = $array['guid'];
		$this->title = $array['title'];
		$this->link = $array['link'];
		$this->date = $array['time'];
		$this->author = $array['author'];
		$this->source = $array['type'];
		$this->categories = $array['categories'];
		$this->teaser = $array['teaser'];
	}
}

?>