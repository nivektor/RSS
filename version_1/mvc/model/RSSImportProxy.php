<?php
require_once './globals.php';
require_once $local. 'mvc/model/FeedProxy.php';
require_once $local. 'lib/rss_php.php';

class RSSImportProxy {
	
	private $connect;
	private $database;
	private $articleTable;
	private $feeds;
	private $feedTitles;
	

	public function RSSImportProxy($connect) {
		$this->connect = $connect;
		$this->database = 'rss';
		$this->feedTable = 'feed';
		$this->articleTable = 'entry';
		$this->feeds = array();
		$this->feedTitles = array();
		$this->connectDB($this->connect, $this->database);
		
		$fp = new FeedProxy($connect);
		$this->feeds = $fp->getFeeds();
		$this->feedTitles = $fp->feedTitles;
		
		
		// echo $this->dateMax; 
		
		$this->injectFeeds();
	}
	
	private function injectFeeds() {
		foreach($this->feeds as $feed)
		{
			// echo($feed->last_import);
			$rss = new rss_php;
		    $rss->load($feed->url);
			$items = $rss->items;

			// print_r(array_reverse($items));

			foreach(array_reverse($items) as $item)
			{
				$this->insertArticles($item, $feed->id, $feed->last_import);
				// print_r($item);
			}
		}
		// echo '<br>'.$this->dateMax.'<br>';

		
	}
	
	public function insertArticles($item, $id, $dateMax) {
		$guid = $item['guid']['value'];
		$title = $item['title']['value'];
		$link = $item['link']['value'];
		$date = strtotime($item['pubDate']['value']);
		$author = $item['dc:creator']['value'];
		$source = $id;
		$categories = $item['category']['value'];
		$teaser = preg_replace('/<[^>]*>/', '', $item['description']['value']);
		
		// $title = str_replace("’","Z",$title);
		$title = htmlentities($title, ENT_QUOTES, "UTF-8");
		$teaser = htmlentities($teaser, ENT_QUOTES, "UTF-8");
		$imagesource = NULL;
		
		// For Ars Technica feeds extract first image :: ignore 1x1 feedburner images
		if(isset($item['content:encoded']['value']))
		{
			preg_match_all('/<img[^>]+>/i',$item['content:encoded']['value'], $result);
			if(isset($result[0][0]))
			{
				preg_match('/src="([^"]*)"/', $result[0][0], $matches);
				if(!preg_match('/feedburner/',$matches[1]))
				{
					$imagesource = $matches[1];
				}
				// echo($imagesource.'<br>');
			}
		}
		
		// For the guardian
		if(isset($item['media:content']['properties']['url']))
		{
			$imagesource = $item['media:content']['properties']['url'];
		}
		
		
		
		// echo 'GUID: '.$guid.'<br>';
		// echo 'Title: '.$title.'<br>';
		// echo 'Link: '.$link.'<br>';
		// echo 'Pub Date: '.$date.'<br>';
		// echo 'Author: '.$author.' - Source: '.$source.'<br>';
		// echo 'Categories: '.$categories.'<br>';
		// echo 'Teaser: '.$teaser.'<br>';
		// echo 'Content: '.$item['content:encoded']['value'].'<br>';
		// echo '<br>';
		
		$searchquery = "SELECT * FROM `{$this->articleTable}` WHERE `guid` LIKE '%{$guid}%'";
		
		$searchresult = mysql_query($searchquery) or die(mysql_error());

		if($date > $dateMax)
		{
			echo $date . ' > '.$dateMax.'<br>';
			$inject2 = "UPDATE feed SET last_import='$date' WHERE id='$id'";
			mysql_query($inject2,$this->connect);
		}
		
		if (mysql_num_rows($searchresult) == 0) 
		{
			
			if($date > $dateMax)
			{
				$inject = "INSERT INTO entry VALUES(null, '$guid', '$source', '$date', '$link', '$title', '$author', '$teaser', '$categories', '$imagesource')";
				mysql_query($inject,$this->connect);
			}
			
		}
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