<?php

class FeedParentModel {
		
	public $id;
	public $name;
	public $enabled;

	public function FeedParentModel($array) {	
		$this->id = $array['id'];
		$this->name = $array['name'];
		$this->enabled = $array['enabled'];
	}
}

?>