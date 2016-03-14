<?php

require('config.php');

if(isset($_POST['username'])){
	$username = $_POST['username'];
	$password = $_POST['password'];
	$password = md5($password);
	$response_array = [];
	//echo $username;
	
	if(isset($_COOKIE["name"]) && isset($_COOKIE[$password])){
		$id = mysql_query("SELECT `id` FROM `users` WHERE `userName` = $userName");
		mysql_query("INSERT INTO `logged_in_users` (`user_id`) VALUES ($id)");
		session_start();
		$name=$_SESSION['name'];     
		echo'welcome :'. $name.'<br>';
		echo'<a href="signout.php">Signout</a>';
		header('location:../profile.html');
	}
	
	if($username != '' && $password != ''){
		$sql = mysql_query("SELECT * FROM `users` WHERE `userName` = '$username' AND `password` = '$password'") or die(mysql_error());
		if(mysql_num_rows($sql) > 0){
			$_SESSION['username']=$username;
			$id = mysql_query("SELECT id FROM `users` WHERE `userName` = $userName");
			mysql_query("INSERT INTO `logged_in_users` (`user_id`) VALUES ($id)");
			session_start();
			$name=$_SESSION['name'];     
			echo'welcome :'. $name.'<br>';
			echo'<a href="signout.php">Signout</a>';
			header('location:../profile.html');
			//echo "you are now logged in";
		}
		else {
			$response_array['status'] = 'The entered username or password is incorrect';
			//echo'The entered username or password is incorrect';
		}
	}
	else {
		$response_array['status'] = 'Enter both username and password';
		//echo'Enter both username and password';
	}
	header('Content-type: application/json');
	echo json_encode($response_array);
}

?>