$(document).ready(function () {
    console.log("Hello World")

        var weatherKey=  "af418dd03c2c611c561b7cbb2962897c"
        var openWeatherUrl= "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=" + "&user_key=" + weatherKey
        
        $.ajax({
            url: openWeatherUrl, 
            method: "GET",
        }).then(function(response){
            console.log(response);
        
        });

});






