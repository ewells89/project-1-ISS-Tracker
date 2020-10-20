$(document).ready(function () {

    // Function to get the list of people who are currently in space and which craft they are on.
    function getPeople() {
        $.getJSON('http://api.open-notify.org/astros.json', function (data) {
            console.log(data.number);
            console.log(data);
            
            var peopleInSpace = data.people;
            console.log("Response Array");
            console.log(peopleInSpace);
            getWiki();
            
            function getWiki(){ 
                for(var i = 0; i < peopleInSpace.length; i++){
                    var person = data.people[i].name
                    console.log(person)
        
        
                    var wikiURL = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=json"+"&srsearch="+person
                    //action=query&list=search&srsearch=Craig%20Noone&format=json"
                
                    // ajax call
                    $.ajax({
                        url: wikiURL,
                        method: "GET",
                    }).then(function(response) {
                        console.log(response)
        
                        //console.log(data.people[i].name);
        
                        // click event for user to get information on space crew
                        var snippet = response.query.search[0].snippet
                        console.log(snippet)
                        var pageID = response.query.search[0].pageid
                        
                        
                        $('#card-body').empty();
                        var cardHolder = $("<div>");
                        cardHolder.attr({
                            "class":"card",
                            "style":"width:18rem", 
                            "style":"background-color:#dbdbdb",
                        });
                        
                        
                      
        
                      
                        $(cardHolder).append('<h5>' + person + '</h5>');
                       $(cardHolder).append(snippet)
                        $('#card-body').append(cardHolder);
        
        
                        //$("card-body").append($("<p> + response.data[i].query.search.snippet + </p>"));
                    
                    });
                        
                }
            

            }

            
        

    
    
        })
    
    }
    getPeople();
});



    