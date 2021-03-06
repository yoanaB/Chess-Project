<?php
    session_start();
    session_regenerate_id();
    if(!isset($_SESSION['name']))      // if there is no valid session
    {
        header("Location: index.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My profile</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='https://fonts.googleapis.com/css?family=Libre+Baskerville' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/profile.css"/>
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="javascript/formValidation.js"></script>
</head>
<body>

<!-- Log out -->
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <div id="logo-container">
                <span id="logo">
                     <img src="images/vector_logo_final.png" alt="logo"/>
                </span>
                <span id="moto"><a href="api/signout.php">Log out</a></span>
            </div>
        </div>
    </div>
</nav>

<div class="container">
    <?php
        require("api/config.php");
        require("api/activeUsers.php");
    ?>
</div>

</body>
</html>