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
            //function to get the information of the crewmates inside the iss
            function getWiki(){ 
                for(var i = 0; i < peopleInSpace.length; i++){
                    var person = data.people[i].name
                    console.log(person)
        
                    //variable for the wiki with a cors http
                    var wikiURL = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=json"+"&srsearch="+person
                    //action=query&list=search&srsearch=Craig%20Noone&format=json"
                
                    // ajax call
                    $.ajax({
                        url: wikiURL,
                        method: "GET",
                    }).then(function(response) {
                        console.log(response)
        
                        
        
                        //variables that target the indiviuals information
                        var snippet = response.query.search[0].snippet
                        console.log(snippet)
                        var pageID = response.query.search[0].pageid
                        
                        
                        //the styling for the card that holds the bio of the crewmates
                        var cardHolder = $("<div>");
                        cardHolder.attr({
                            "class":"card",
                            "style":"width:18rem", 
                            "style":"background-color:#dbdbdb",
                        });
                        
                        
                      
        
                      
                       //appending the information of the crewmates in card and also a link to thier direct wiki page
                       $(cardHolder).append(snippet +"...")
                       $(cardHolder).append("<p>Read the full article " + "<a href = 'http://en.wikipedia.org/?curid=" + pageID + "'>here</a>.</p>")
                       $('#card-body').append(cardHolder);
                       
        
        
                        
                    
                    });
                        
                }
            

            }

            
        

    
    
        })
    
    }
    getPeople();
});



    