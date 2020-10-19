$(document).ready(function () {

    // Function to get the list of people who are currently in space and which craft they are on.
    function getPeople() {
        $.getJSON('http://api.open-notify.org/astros.json', function (data) {
            console.log(data.number);
            console.log(data);
            
            var peopleInSpace = data.people;
            console.log("Response Array");
            console.log(peopleInSpace);
            

            function getWiki(){
                for(var i = 0; i < peopleInSpace.length; i++){
                    var person = data.people[i].name
                    console.log(person)

                var queryURL = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=json"+"&srsearch="+person
                //action=query&list=search&srsearch=Craig%20Noone&format=json"
               
                $.ajax({
                    url: queryURL,
                    method: "GET",
                }).then(function(response) {
                    console.log(response)

                    //console.log(data.people[i].name);

                    $("search-btn").click(function () {

                    $("astronaut-description").append($("<p> + response.data[i].query.search.snippet + </p>"));
                   
                });
                    
                });
            }

            }

            getWiki();
        });

    }

    getPeople();

});



    