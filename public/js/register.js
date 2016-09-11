$(document).ready(function() {
  //make another one for request button,
  $("#registerButton").click(function(e) {
        e.preventDefault();

        var geocoder = new google.maps.Geocoder();
        

        var latitude;
        var longitude;


        geocodeAddress(geocoder);

        

        
        function initMap() {

        }

        function geocodeAddress(geocoder) {
          var address = document.getElementById('address').value;
          geocoder.geocode({'address': address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              console.log("GOOOGLE API OUTCOME", results[0].geometry.location);
              latitude = results[0].geometry.location.lat();
              longitude = results[0].geometry.location.lng();
              console.log("lat: " + latitude + " lng: " + longitude);
              $.ajax({
                method: "POST",
                url: "/success", // put the real url
                data: {
                  name: $("#name").val(),
                  userType: 0,
                  address: $("#address").val(),
                  zipCode: $("#zipCode").val(),
                  latitude: latitude,
                  longitude: longitude,
                  phoneNum: $("#phoneNum").val(),
                  quantity: $("#quantity").val(),
                  startDate: $("#startDate").val(), // need to be in yyyy/mm/dd form
                  endDate: $("#endDate").val(), // need to be in yyyy/mm/dd form
                  price: $("#price").val()
                },
                success: function(data) {
                    $("html").html(data);
                    //do function that is possibly needed
                },
                error: function(err) {
                    var responseText = JSON.parse(err.responseText);
                    //do something that is possibly needed
                }
        });
              //need to feel latitude, longitude here
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
        }

        
    });
})