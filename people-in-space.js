<<<<<<< HEAD
$(document).ready(function () {

    // Function to get the list of people who are currently in space and which craft they are on.
    function getPeople() {
        $.getJSON('http://api.open-notify.org/astros.json', function (data) {
            console.log(data.number);
            console.log(data)
        });

        
    }

    getPeople();
=======
$(document).ready(function() {
//console.log("hello")
 var queryURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Craig%20Noone&format=json"

$.ajax({
    url: queryURL,
    method: "GET",
}).then(function(response) {

});
>>>>>>> 7780b7557165e5991589be42d4dc8730026e93a3

});
