<?php

require('config.php');

function isJson($string) {
 json_decode($string);
 return (json_last_error() == JSON_ERROR_NONE);
}

if(isJson(file_get_contents('php://input'))) {
	$data = json_decode(file_get_contents('php://input'), true);
} else {
	$data = $_POST;
}

if(isset($data['username'])){
	$username = $data['username'];
	$password = $data['password'];
	$password = md5($password);
	
	if(isset($_SESSION["name"])){
		$id = mysql_query("SELECT `id` FROM `users` WHERE `userName` = $userName");
		mysql_query("UPDATE `users` SET `is_logged_in` = 'true' WHERE `id` = $id");
		http_response_code(200);
	}
	
	if($username != '' && $password != ''){
		$sql = mysql_query("SELECT * FROM `users` WHERE `userName` = '$username' AND `password` = '$password'") or die(mysql_error());
		if(mysql_num_rows($sql) > 0){
			$queryResponse = mysql_fetch_array(mysql_query("SELECT `id` FROM `users` WHERE `userName` = '$username'"));
			$id = $queryResponse["id"];
			mysql_query("UPDATE `users` SET `is_logged_in` = 'true' WHERE `id` = '$id'");

			session_start();
			$_SESSION["name"] = $username;

			http_response_code(200);
		}
		else {
			http_response_code(403);
		}
	}
	else {
		http_response_code(403);
	}
} else {
	http_response_code(403);
}