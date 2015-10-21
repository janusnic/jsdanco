<?php

	//connection information
	$host = "localhost";
	$user = "danwellm_test";
	$password = "Bethany99";
	$database = "danwellm_test";
	$param = $_GET["term"];
	
	//make connection
	$server = mysql_connect($host, $user, $password);
	$connection = mysql_select_db($database, $server);
	
	//protect against sql injection
	mysql_real_escape_string($param, $server);
	
	//query the database
	$query = mysql_query("SELECT * FROM friends WHERE name REGEXP '^$param'");
	
	//build array of results
	for ($x = 0, $numrows = mysql_num_rows($query); $x < $numrows; $x++) {
		$row = mysql_fetch_assoc($query);
    
		$friends[$x] = array("name" => $row["name"], "email" => $row["email"]);		
	}
	
	//echo JSON to page
	$response = $_GET["callback"] . "(" . json_encode($friends) . ")";
	echo $response;
	
	mysql_close($server);
	
?>