<?php
require_once 'globals.php';
require_once $local.'mvc/model/RSSImportProxy.php';
require_once $local.'mvc/model/ArticleProxy.php';
require_once $local.'mvc/model/FeedProxy.php';
require_once $local.'mvc/view/FeedList.php';
require_once $local.'mvc/view/ArticleList.php';

class Application {
	
	public $ri;
	public $fp;
	public $ap;
	public $get;
	public $feedList;
	public $articleList;
	
	public function Application() {
		
		$this->fp = new FeedProxy($GLOBALS['connect']);
		$this->ap = new ArticleProxy($GLOBALS['connect']);
		$this->fp->getFeeds();
		$this->get = 0;
	}
	
	public function getFeedList() {
		$this->feedList = new FeedList($this->fp->feedData);
	}
	
	public function getArticleList($g, $table) {
		// echo $_COOKIE["RSSLoginCookie"];	
		$result = mysql_query("SELECT last_import FROM time");
		$array = mysql_fetch_row($result);

		echo '<p>Lastest Article Time: '.date("F j, Y, g:i a", $array[0]);
		// var_dump($g);
		// $table = 'entry';
		$id = 0;
		
		if(isset($g['id']))
		{
			$id = $g['id'];
		}

		if($id == 0)
		{
			$value = 0;
			$al = new ArticleList($this->ap->getArticles($value, $table), $this->fp->feedTitles);
			// echo $ap->dateMax;
			// apc_store('dateMax',$this->ap->dateMax);
			// print_r($fp->feedData);
		}
		else
		{
			// echo $fp->feedTitles[$value - 1];
			// print_r ($fp->feedTitles);
			
			$al = new ArticleList($this->ap->getArticles($id, $table), $this->fp->feedTitles);
		}
		$this->get = $id;
	}
	
	public function importRSS() {
		$ri = new RSSImportProxy($GLOBALS['connect']);
	}
}
?>
