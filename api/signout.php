<?php     

	require('config.php');

	session_start();
	
	$name = $_SESSION['name'];
	$id = mysql_query("SELECT `id` FROM `users` WHERE `userName` = $userName");
	mysql_query("DELETE FROM `logged_in_users` WHERE  'id'= $id ");
	session_destroy();

	header('location:../home.html');