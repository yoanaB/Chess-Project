<?php

require('config.php');

if(isset($_POST['username'])){
	
	$username = $_POST["username"];
	$email = $_POST["email"];
	$password = $_POST["password"];
	$passwordRepeat = $_POST["repeatPassword"];
	
	if($password === $passwordRepeat && strlen($username) > 5 && filter_var($email, FILTER_VALIDATE_EMAIL)){
		$username = mysql_escape_string($_POST["username"]);
		$email = mysql_escape_string($email);
		$password = mysql_escape_string($password);
		
		$password = md5($password);
		
		$sql = mysql_query("SELECT * FROM `users` WHERE `userName` = '$username'");
		$sql2 = mysql_query("SELECT * FROM `users` WHERE `email` = '$email'");
		if(mysql_num_rows($sql) > 0){
			echo "Sorry, that user already exists!";
		}
		if(mysql_num_rows($sql2) > 0){
			echo "Sorry, that email is already in use!";
		}
		
		mysql_query("INSERT INTO `users` (`id`, `userName`, `email`, `password`, `email_activation`, `is_logged_in`) VALUES (NULL, '$username', '$email' , '$password', 'false', 'false')");
		//http_response_code(200);
	}else{
		//http_response_code(400);
		echo "Unsuccessful registration! Please try again!";
		exit();
	} 
	
}

