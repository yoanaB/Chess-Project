<?php

require('config.php');

$table = '<table>';

$queryResponse = mysql_query("SELECT * FROM `users` WHERE `is_logged_in` = 'true'");

while($data = mysql_fetch_assoc($queryResponse)) {
  //will output all data on each loop.
  $table = $table . '<tr><td>' . $data["userName"] . "</td></tr>";
}

$table = $table . '</table>';

echo $table;

