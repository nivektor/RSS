<?php

// require_once $GLOBALS['local']. 'model/ArticleModel.php';

class ArticleProxy {
	
	private $connect;
	private $database;
	public $feedTable;
	private $articleTable;
	public $dateMax;
	

	public function ArticleProxy($connect) {
		$this->connect = $connect;
		$this->database = 'rss';
		$this->feedTable = 'feed';
		$this->articleTable = 'entry';
		$this->dateMax = 0;
		$this->connectDB($this->connect, $this->database);
	}

	public function getArticles($feedId, $table) {
		$array = array();
		if($feedId == 0)
		{
			$result = mysql_query("SELECT * FROM `{$table}` ORDER BY time ASC");
		}
		else
		{
			$result = mysql_query("SELECT * FROM `{$table}` WHERE type = '$feedId' ORDER BY time ASC");
		}
		
		while($row = mysql_fetch_assoc($result))
		{
			$article = new ArticleModel($row);
			
			
			if($article->time > $this->dateMax)
			{
				$this->dateMax = $article->time;
			}
			// $article->time = date("F j, Y, g:i a", $article->time);
			$article->title = html_entity_decode($article->title, ENT_QUOTES, 'utf-8');
			$article->teaser = html_entity_decode($article->teaser, ENT_QUOTES, 'utf-8');
			array_push($array, $article);
		}
		// echo $article->date;
		// print_r($array);
		return $array;
	}
	
	public function saveArticle($feedId) {
		mysql_query("INSERT INTO saved SELECT * FROM entry WHERE id = '$feedId'");
		mysql_query("DELETE FROM entry WHERE id = '$feedId'");
	}
	
	public function deleteArticle($feedId, $table) {
		mysql_query("DELETE FROM $table WHERE id = '$feedId'");
	}
	
	public function deleteSavedArticle($feedId, $table) {
		mysql_query("DELETE FROM $table WHERE id = '$feedId'");
	}
	
	private function connectDB($connect, $database) {
		if (!$connect)
		{
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db($database, $connect);
	}
	
	public function getLatestTime() {
		$result = mysql_query("SELECT last_import FROM time");
		$array = mysql_fetch_row($result);
		$time = date("F j, Y, g:i a", $array[0]);
		return $time;
	}
	
}

$feedCount = 1;
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