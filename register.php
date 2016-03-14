<?php

require('config.php');

var_dump($_POST);
die();

if(isset($_POST['submit'])){
	
	$username = $_POST["username"];
	$email = $_POST["email"];
	$password = $_POST["password"];
	$passwordRepeat = $_POST["repeatPassword"];
	
	if($password === $passwordRepeat && preg_match(\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b, $_POST("email")) && strlen($username) > 5{
		$name = mysql_escape_string($_POST["name"]);
		$email = mysql_escape_string($email);
		$password = mysql_escape_string($password);
		
		$password = md5($password);
		
		$sql = mysql_query("SELECT * FROM `users` WHERE `userName` = '$username'");
		if(mysql_num_rows(sql) > 0){
			echo "Sorry, that user already exists!";
		}
		
		mysql_query("INSERT INTO `users` (`id`, `userName`, `email`, `password`, `email_activation`, `is_logged_in`) VALUES (NULL, '$username', '$email', '$password', 'false', 'false')")
	}else{
		echo 'ti si urod';
		exit();
	}
	
}

