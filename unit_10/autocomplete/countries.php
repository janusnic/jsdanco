<?php

	header('Content-type: application/json');
	
	//db connection detils
	$host = "localhost";
	$user = "danwellm_dan";
	$password = "b1e2t3h4a5n6y799";
	$database = "danwellm_autoComp";
	$param = $_GET["term"];
  
	//make connection
	$server = mysql_connect($host, $user, $password);
	$connection = mysql_select_db($database, $server);
  
	//protect against sql injection
	mysql_real_escape_string($param, $server);
  
	//query the database
	$query = mysql_query("SELECT * FROM countries WHERE country REGEXP '^$param'");
	
	//loop through and return matching entries
	for ($x = 0, $numrows = mysql_num_rows($query); $x < $numrows; $x++) {
		$row = mysql_fetch_assoc($query);
		
		$countries[$x] = array("label" => $row["country"]);
	}
	
	//return JSON with GET for JSONP callback
	$response = $_GET["callback"] . "(" . json_encode($countries) . ")";
	echo $response;

	mysql_close($server);
?>