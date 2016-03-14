$(document).ready(function (){
    $.ajax({
        url:'api/welcome.php',
        method: 'GET'
    }).done(function(response){
        $(".container").append('h1').html(response);
    })

    $.ajax({
        url: 'api/activeUsers.php',
        method:'GET'
    }).done(function (response){
        $(".container").append('div').html(response);
    })
})
