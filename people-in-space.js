$(document).ready(function () {

    // Function to get the list of people who are currently in space and which craft they are on.
    function getPeople() {
        $.getJSON('http://api.open-notify.org/astros.json', function (data) {
            console.log(data.number);
            console.log(data)


            function getWiki(){
                var queryURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Craig%20Noone&format=json"
    
                $.ajax({
                    url: queryURL,
                    method: "GET",
                }).then(function(response) {
                    console.log(response);
                });

            }

            getWiki();
        });

    }

    getPeople();

});



    