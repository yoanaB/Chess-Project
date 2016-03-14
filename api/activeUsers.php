<?php

require('config.php');

$sql = mysql_query("SELECT * FROM `logged_in_users`");
//$sql = fetch_assoc($sql);

if ($sql->num_rows > 0) {
	$sql = fetch_assoc($sql);
    echo "<table><tr><th>ID</th><th>Name</th></tr>";
	while($sql){
		$id = $sql['id'];
		$users = mysql_query("SELECT * FROM `users` WHERE `id` = $id");
		if($users->num_rows > 0){
			echo "<tr><td>".$row["id"]."</td><td>".$row["firstname"]." ".$row["lastname"]."</td></tr>";
		}
	}
    echo "</table>";
} else {
    echo "0 results";
}

