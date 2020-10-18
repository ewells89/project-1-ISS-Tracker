$(document).ready(function () {
    //console.log(hello)
    //variables
    var searchBar = document.getElementById('searchBar');
    var searchBtn = document.getElementById('searchBtn');
    var query = searchBar.value;
    var api = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch"

    //functions
    

  
    $.ajax({
       apikey: "api",
       method: "GET",
       datatype: "json"
   }).then(function(response) {
       console.log(response);
   });

   

});