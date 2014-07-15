<?php

// require_once $local. 'mvc/model/FeedModel.php';

class FeedProxy {
	
	private $connect;
	private $database;
	private $feedTable;
	public $feedData;
	public $feedTitles;

	public function FeedProxy($connect) {
		$this->connect = $connect;
		$this->database = 'rss';
		$this->feedTable = 'feed';
		$this->articleTable = 'entry';
		$this->feedData = array();
		$this->feedTitles = array();
		$this->connectDB($this->connect, $this->database);
	}

	public function getFeeds() {
		$result = mysql_query("SELECT * FROM `{$this->feedTable}`");

		while($row = mysql_fetch_array($result))
		{
			if($row['enabled'] == 1)
			{
				$feed = new FeedModel($row);
				array_push($this->feedData, $feed);
				array_push($this->feedTitles, $feed->title.': '.$feed->parent);
			}
		}
		// print_r($this->feedData);
		return $this->feedData;
	}
	
	public function getFeedTitles() {
		foreach($this->feedData as $feed)
		{
			print_r($this->feedData);
			if($feed->enabled == 1)
			{
				
				array_push($this->feedTitles, $feed->title);
			}
		}
		return $this->feedTitles;
	}
	
	private function connectDB($connect, $database) {
		if (!$connect)
		{
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db($database, $connect);
	}
	
}

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