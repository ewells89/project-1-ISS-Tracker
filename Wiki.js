$(document).ready(function () {
    //console.log(hello)
    var api = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch"
    var searchbtn = $("search-btn")
    var input = $("search-input")
  
    $.ajax({
       apikey: api,
       method: "GET",
       datatype: "json"
   }).then(function(response) {
       console.log(response);
   });

   

});