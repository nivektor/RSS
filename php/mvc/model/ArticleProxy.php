<?php

require_once $local. 'mvc/model/ArticleModel.php';

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
			$result = mysql_query("SELECT * FROM `{$table}` ORDER BY time DESC LIMIT 0,130");
		}
		else
		{
			$result = mysql_query("SELECT * FROM `{$table}` WHERE type = '$feedId' ORDER BY time DESC LIMIT 0,130");
		}
		
		while($row = mysql_fetch_assoc($result))
		{
			$article = new ArticleModel($row);
			
			array_push($array, $article);
			if($article->date > $this->dateMax)
			{
				$this->dateMax = $article->date;
			}
		}
		// echo $article->date;
		// print_r($array);
		return $array;
	}
	
	public function saveArticle($feedId) {
		mysql_query("INSERT INTO saved SELECT * FROM entry WHERE id = '$feedId'");
		mysql_query("DELETE FROM entry WHERE id = '$feedId'");
	}
	
	public function deleteArticle($feedId) {
		mysql_query("DELETE FROM entry WHERE id = '$feedId'");
	}
	
	public function deleteSavedArticle($feedId) {
		mysql_query("DELETE FROM saved WHERE id = '$feedId'");
	}
	
	private function connectDB($connect, $database) {
		if (!$connect)
		{
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db($database, $connect);
	}
	
}

$feedCount = 1;

?>