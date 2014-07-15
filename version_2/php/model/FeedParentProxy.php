<?php

require_once $local. 'mvc/model/FeedParentModel.php';

class FeedParentProxy {
	
	private $connect;
	private $database;
	private $feedTable;
	public $feedData;

	public function FeedParentProxy() {
		$this->connect = mysql_connect("localhost","root","root");
		$this->database = 'rss';
		$this->feedTable = 'feed_parent';
		$this->feedData = array();
		$this->connectDB($this->connect, $this->database);
	}

	public function getFeeds() {
		$result = mysql_query("SELECT * FROM `{$this->feedTable}`");

		while($row = mysql_fetch_array($result))
		{
			if($row['enabled'] == 1)
			{
				$feed = new FeedParentModel($row);
				array_push($this->feedData, $feed);
			}
		}
		// print_r($this->feedData);
		return $this->feedData;
	}
	
	private function connectDB($connect, $database) {
		if (!$connect)
		{
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db($database, $connect);
	}
	
}


?>