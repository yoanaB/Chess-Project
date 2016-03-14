<?php

$user = 'root';
$password = '';
$db = 'chessdb';

$db = new mysqli('localhost', $user, $password, $db) or die('Unable to connect!');

echo 'Good work!';

?>