$(document).ready(function () {
    // console.log("Hello");

    // Function to get the current location of the ISS by lattitude/longitude.
    function getISSLocation() {
        var mymap = L.map('mapid').setView([0, 0], 2);

        function moveISS() {
            $.getJSON('https://api.open-notify.org/iss-now.json?callback=?', function (data) {
                var lat = data['iss_position']['latitude'];
                var lon = data['iss_position']['longitude'];

                iss.setLatLng([lat, lon]);
                isscirc.setLatLng([lat, lon]);
                mymap.panTo([lat, lon], animate = true);
            });
            setTimeout(moveISS, 5000);
        }

        // Leaflet map 
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZXdlbGxzODkiLCJhIjoiY2tnY3p6b2pjMDhxODJzcGV1MTlwbHNnayJ9.8c10WiHSmEVy8wf4CbjNjw'
        }).addTo(mymap);

        // Icon to display the ISS position on the leaflet map
        var ISSIcon = L.icon({
            iconUrl: './assets/ISSIcon.png',
            iconSize: [50, 30],
            iconAnchor: [25, 15],
            popupAnchor: [50, 25],
            shadowUrl: './assets/ISSIcon_shadow.png',
            shadowSize: [60, 40],
            shadowAnchor: [30, 15]
        });


        var iss = L.marker([0, 0], { icon: ISSIcon }).addTo(mymap);
        var isscirc = L.circle([0, 0], 800e3, { color: "#c22", opacity: 0.3, weight: 1, fillColor: "#c22", fillOpacity: 0.1 }).addTo(mymap);

        moveISS();

    };

    // Click event for user to enter the location to get pass by times and weather information
    $("#searchBtn").on("click", function (event) {
        event.preventDefault();

        var postalCode = $("#postalCode").val();
        var geocodeURL = 'https://open.mapquestapi.com/geocoding/v1/address?key=CRg7ye19CBAPnrjmea0n5OjRpXHiXHYG' + '&postalCode=' + postalCode
        // + '&city=' + city + '&state=' + state;

        // AJAX Call to get passby times and to append these to the DOM
        $.ajax({
            url: geocodeURL,
            method: "GET"
        }).then(function (response) {
            // console.log("geocode response");
            // console.log(response)

            var lat = response.results[0].locations[0].latLng.lat;
            var lon = response.results[0].locations[0].latLng.lng;
            var area = (response.results[0].locations[0].adminArea5 + ", " + response.results[0].locations[0].adminArea3)
            // console.log(lat);
            // console.log(lon);
            // console.log(area);
            getPassby();

            // Function to get pass by times by location entered on the click event
            function getPassby() {
                $.getJSON('http://api.open-notify.org/iss-pass.json?' + 'lat=' + lat + '&lon=' + lon + '&callback=?', function (data) {
                    $('#passCard').empty();
                    var cardHolder = $("<div>");
                    cardHolder.attr({
                        "class": "card",
                        "style": "width:18rem",
                        "style": "background-color:#dbdbdb",
                    });
                    $('#passCard').append(cardHolder);

                    var card = $("<div>");
                    card.attr({
                        "class": "card-body",
                    });

                    $(cardHolder).append(card);
                    $(card).append('<h5>' + "Next 5 ISS passby times for your area:" + '</h5>');
                    data['response'].forEach(function (d) {
                        var date = new Date(d['risetime'] * 1000);
                        $(card).append('<li>' + date.toString() + '</li>');
                        // console.log("Passby");
                        // console.log(date)
                        // console.log(data);


                    });
                });

            }
        })

        cityForecast();

        //Function to get 3 hr forecast on click event when zip code is entered
        function cityForecast() {

            var apiKey = "63de61e390b4a0f5e75ff9df058d248b";
            var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" +
                postalCode + "&appid=" + apiKey;
            console.log(queryURL)

            //Ajax call to get 3 hr weather data and append to the DOM
            $.ajax({
                url: queryURL,
                method: "GET",
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    const responseArray = response.list
                    // console.log(responseArray);
                    var location = response.city.name
                    console.log(location);
                    $('#weatherCard').empty();
                    var cardHold = $("<div>");
                    cardHold.attr({
                        "class": "cardWeather",
                        "style": "background-color:#dbdbdb",
                    },
                        // {"<h5>":location,}
                    );

                    $(cardHold).append("<h5>" + "Weather Forecast for " + location + "</h5>")
                    $('#weatherCard').append(cardHold);

                    //For loop used to iterate through the weather API
                    for (var i = 0; i < 5; i++) {
                        var dateWx = response.list[i].dt_txt;
                        var wxIcon = response.list[i].weather[0].icon;
                        // console.log(wxIcon);
                        var icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + wxIcon + "@2x.png");
                        var tempF = Math.round((response.list[i].main.temp - 273.15) * 1.8 + 32) + "F";
                        // console.log(tempF);
                        var humidity = response.list[i].main.humidity + "%";
                        // console.log(humidity);
                        var wind = response.list[i].wind.speed + " mph";
                        // console.log(wind);

                        var cardDiv = $("<div>");
                        cardDiv.attr("class", "cardDiv")

                        var cardDivDate = $("<p>")
                        cardDivDate.attr("class", "cardWeather",)
                        cardDivDate.append(dateWx);
                        $(cardDiv).append(cardDivDate);

                        var cardDivIcon = $("<div>")
                        cardDivIcon.attr("class", "cardWeather",)
                        cardDivIcon.append(icon);
                        $(cardDiv).append(cardDivIcon);

                        var cardDivTemp = $("<div>")
                        cardDivTemp.attr("class", "cardWeather")
                        cardDivTemp.append("Temperature: " + tempF);
                        $(cardDiv).append(cardDivTemp);

                        var cardDivHumidity = $("<div>")
                        cardDivHumidity.attr("class", "cardWeather",)
                        cardDivHumidity.append("Humidity: " + humidity);
                        $(cardDiv).append(cardDivHumidity);

                        var cardDivWind = $("<div>")
                        cardDivWind.attr("class", "cardWeather",)
                        cardDivWind.append("Wind Speed: " + wind);
                        $(cardDiv).append(cardDivWind);

                        $(cardHold).append(cardDiv);


                    };

                }
            })


        };

    })


    getISSLocation();

});
