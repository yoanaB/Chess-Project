<?php     

	require('config.php');

	session_start();
	session_regenerate_id();

	// if there is no valid session
    if(isset($_SESSION['name'])) {
        $username = $_SESSION['name'];
		$queryResponse = mysql_fetch_array(mysql_query("SELECT `id` FROM `users` WHERE `userName` = '$username'"));
		$id = $queryResponse["id"];
		mysql_query("UPDATE `users` SET `is_logged_in` = 'false' WHERE `id` = '$id'");
		session_destroy();
    }

	header('location:../index.php');


