<?php

class FeedModel {
		
	public $id;
	public $url;
	public $title;
	public $parent;
	public $enabled;
	public $last_import;

	public function FeedModel($array) {	
		$this->id = $array['id'];
		$this->url = $array['url'];
		$this->title = $array['title'];
		$this->parent = $array['parent'];
		$this->enabled = $array['enabled'];
		$this->last_import = $array['last_import'];
	}
}

?>