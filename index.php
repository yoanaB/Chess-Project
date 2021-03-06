<?php
    session_start();
    session_regenerate_id();

    // if there is valid session
    if(isset($_SESSION['name'])) {
        header("Location: profile.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome to Chess!</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='https://fonts.googleapis.com/css?family=Libre+Baskerville' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css"/>
    <!--<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"> -->
    <!--<link rel="stylesheet" href="css/reset.css"/>-->
    <link rel="stylesheet" href="css/home.css"/>
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="javascript/formValidation.js"></script>

</head>
<body>

<!-- Register -->
<div id="register" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Make registration</h4>
            </div>
            <div class="modal-body">
                <div class="forms">

                    <div class="form-container">
                        <form role="form" id="reg" class="registration-form" action="api/register.php" method="POST">
                            <div class="form-group">
                                <label for="user-name">User name:</label>
                                <input type="text" class="form-control" id="user-name" name="username">
                                <span class="warning user-name"></span>
                            </div>
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" class="form-control to-test" id="email" name="email">
                                <span class="warning email"></span>
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <input type="password" class="form-control" id="password" name="password">
                                <span class="warning password"></span>
                            </div>
                            <div class="form-group">
                                <label for="repeat-password">Repeat password:</label>
                                <input type="password" class="form-control to-test" id="repeat-password" name="repeatPassword">
                                <span class="warning password-repeat"></span>
                            </div>
                            <button type="submit" class="btn btn-default form-button" id="submit-register-btn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--Log in-->

<div id="log-in" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Log in</h4>
            </div>
            <div class="modal-body">
                <div class="forms">
                    <div class="form-container">
                        <form role="form" id="log-in-form">
                            <div class="form-group">
                                <label for="user-name-log-in">User name:</label>
                                <input type="text" class="form-control" id="user-name-log-in" name="username">
                                <span class="warning username"></span>
                            </div>
                            <div class="form-group">
                                <label for="password-log-in">Password:</label>
                                <input type="password" class="form-control" id="password-log-in" name="password">
                                <span class="warning password"></span>
                            </div>
                            <button type="submit" class="btn btn-default form-button" id="submit-log-in-btn" >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Main content -->
<div id="shadow"></div>
<div id="logo-container">
    <span id="logo">
        <img src="images/vector_logo_final.png" alt="logo"/>
    </span>
    <span id="moto">Your chess</span>
</div>
<div id="container">
    <h1 id="welcome">
        Welcome to the best site for playing multiplayer chess!
    </h1>
    <h3>
        If you want to play, first log in.
    </h3>
    <button type="button" class="btn btn-default" data-toggle="modal" data-target="#register">Register</button>
    <button type="button" class="btn btn-default" data-toggle="modal" data-target="#log-in">Log in</button>
</div>
</body>
</html>