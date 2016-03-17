
    'use strict';

    $(document).ready(function () {
        var warnings = $('.warning');
        var warning = false;
        $('#user-name').on('change keyup paste', function(event){
            var nameRegister = $(event.target).val();
            if (nameRegister.length < 5){
                $(event.target).next().html('Your username must be at least 5 characters long!');
            }
            else if($(event.target).parent().find('.warning') && nameRegister.length >= 5){
                $('.warning').html('');
            }
            warning = $('.warning').html() !== '';
            console.log(warning);
        })
        $('#password').on('change keyup paste', function(event){
            var password = $(event.target).val();
            if (password.length < 5){
                $(event.target).next().html('Your password must be at least 5 characters long!');
            }
            else if($(event.target).parent().find('.warning') && password.length >= 5){
                $('.warning').html('');
            }
            warning = $(event.target).parent().find('.warning') !== '';
        })
        $('#repeat-password').on('change keyup paste', function(event){
            var repeatedPassword = $(event.target).val();
            var password = $('#password').val();
            if (repeatedPassword !== password){
                $(event.target).next().html('The repeated password isn\'t the same!');
            }
            else if($(event.target).parent().find('.warning') && repeatedPassword.length >= 5){
                $('.warning').html('');
            }
            warning = $('.warning').html() !== '';
        })

        //console.log(warning);

        $('#reg').submit(function (event) {
            event.preventDefault();
            console.log(warnings);

            var serializedForm = $(this).serializeArray();

            console.log(serializedForm);

            if (!warning) {
                $.ajax({
                    method: "POST",
                    data: serializedForm
                }).done(function (response) {
                    console.log(response);
                });
            }
        });

        $('#log-in-form').submit(function (event) {
            event.preventDefault();

            var serializedForm = $(this).serializeArray();

            console.log(serializedForm);
            $.ajax({
                url: 'api/login.php',
                method: 'POST',
                data: serializedForm
            }).done(function () {
                window.location.href = 'profile.php';
            })
        })
    })



