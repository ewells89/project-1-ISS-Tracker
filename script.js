$(document).ready(function () {
    // console.log("Hello");


    // MARTA API
    function getMartaAllBus(){

        var martaBusQueryURL = "https://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus"

        // AJAX Query for MARTA BUS API
        $.ajax({
            url: martaBusQueryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            // Console logging response parameters
        });

    };

    getMartaAllBus();
});
