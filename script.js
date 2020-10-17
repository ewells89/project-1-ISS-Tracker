$(document).ready(function () {
    // console.log("Hello");

    function getISSLocation(){
        var mymap = L.map('mapid').setView([0,0], 2);
        
        function moveISS () {
            $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
                var lat = data['iss_position']['latitude'];
                var lon = data['iss_position']['longitude'];

                iss.setLatLng([lat, lon]);
                isscirc.setLatLng([lat, lon]);
                mymap.panTo([lat, lon], animate=true);
            });
            setTimeout(moveISS, 5000); 
        }

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZXdlbGxzODkiLCJhIjoiY2tnY3p6b2pjMDhxODJzcGV1MTlwbHNnayJ9.8c10WiHSmEVy8wf4CbjNjw'
        }).addTo(mymap);

        var ISSIcon = L.icon({
            iconUrl: './assets/ISSIcon.png',
            iconSize: [50, 30],
            iconAnchor: [25, 15],
            popupAnchor: [50, 25],
            shadowUrl: './assets/ISSIcon_shadow.png',
            shadowSize: [60, 40],
            shadowAnchor: [30, 15]
        });


        var iss = L.marker([0, 0], {icon: ISSIcon}).addTo(mymap);
        var isscirc = L.circle([0,0], 800e3, {color: "#c22", opacity: 0.3, weight:1, fillColor: "#c22", fillOpacity: 0.1}).addTo(mymap); 

        moveISS();

    };


    function getPassby(){
        var lat = "";
        // var lat = "45.0";
        var lon = "";
        // var lon = "122.3";

        $.getJSON('http://api.open-notify.org/iss-pass.json?' + 'lat=' + lat +'&lon=' + lon + '&callback=?', function(data) {
            data['response'].forEach(function (d) {
                var date = new Date(d['risetime']*1000);
                $('#isspass').append('<li>' + date.toString() + '</li>');
                console.log("Passby");
                console.log(date)
            });
        });
    }


getISSLocation();
getPassby();
});

