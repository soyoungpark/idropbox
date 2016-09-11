$(document).ready(function() {
  //make another one for request button,
  $("#searchButton").click(function(e) {
        e.preventDefault();

        var geocoder = new google.maps.Geocoder();


        var latitude;
        var longitude;


        geocodeAddress(geocoder);

        /* b/c potential bug


        function initMap() {

        }
        */

        function geocodeAddress(geocoder) {
          var address = document.getElementById('address').value;
          geocoder.geocode({'address': address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              latitude = results[0].geometry.location.lat();
              longitude = results[0].geometry.location.lng();
              /*
              $.ajax({
                method: "POST",
                url: "/lists", // put the real url
                data: {
                  name: $("#name").val(),
                  userType: 1,
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
        });*/
              //need to feel latitude, longitude here
              var address = $("#address").val()
              var zip = $("#zipCode").val()
              var quantity = $("#quantity").val()
              var startDate = $("#startDate").val()
              var endDate = $("#endDate").val()
              var price = $("#price").val()
              var url='http://idropbox.herokuapp.com/lists?zipCode=' + zip + "&address=" +address + "&quantity=" +quantity+ "&startDate=" +startDate+ "&endDate=" +endDate+ "&price=" + price;
              $(location).attr('href',url);
              return false
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
        }


    });
})
