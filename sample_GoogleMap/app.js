var geocoder;
var map;
var address = "137 SirRRRRR James Pieris Mawatha, Colombo 00200";
//var address = "Delgahana Kaththa Rd, Sri Lanka";
//var address ="6.919045587514521,79.86808263448486";


function initialize() {

  geocoder = new google.maps.Geocoder();

  var latlng = new google.maps.LatLng(-34.397, 150.644);
  
  var myOptions = {
    zoom: 20,
    center: latlng,
    zoomControl: true,
    zoomControlOptions: {
     style: google.maps.ZoomControlStyle.SMALL

    },
               
                  
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  
    gestureHandling: "greedy",
    navigationControl: true


  };
   



  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);


  if (geocoder) {

    geocoder.geocode({'address': address}, function(results, status) {


      if (status == google.maps.GeocoderStatus.OK) {
        
        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {


          map.setCenter(results[0].geometry.location);

      

          var marker;

           marker= new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            draggable: true
           
          });

       

        function markLocation(){

         //get the location         
         var currentLocation = marker.getPosition();

         var lat= document.getElementById('lat').value = currentLocation.lat(); //latitude
         var lng =document.getElementById('lng').value = currentLocation.lng(); //longitude
         console.log("Latitudes :"+lat);
         console.log("Logitudes :"+lng);                  
         currentLocation = new google.maps.LatLng(lat, lng);
         console.log(currentLocation);
         //var geocoder = geocoder = new google.maps.Geocoder();
                 
         geocoder.geocode({ 'latLng': currentLocation }, function (results, status) {
                 
         if (status == google.maps.GeocoderStatus.OK) {
                 
             if (results[1]) {
                 
             document.getElementById('address').value = results[1].formatted_address;
                                         
             }
         }
        }); 

      }

      markLocation();
        

      google.maps.event.addListener(marker, 'dragend', function() {



            markLocation();

           
          
      });

        
      }
    

       else   {

          alert("No results found");
        }
      } else {

        alert("Geocode was not successful for the following reason: " + status);
        
      }
    });
  }
}



google.maps.event.addDomListener(window, 'load', initialize);



//save the location
  function getLocation(){

    var lat = document.querySelector('#lat');
    var lng = document.querySelector('#lng');
 
     
    
    
    var xhr = new XMLHttpRequest();
    var url = "";
    //xhr.withCredentials = true;
    
    
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {

          // Print received data from server
        console.log(this.responseText);

      }
  };

    var data = JSON.stringify({
      "success": true,
      "message": "Success",
      "order_id": 123654,
      "location": {
        "Latitude ":lat.value,
        "Longitude": lng.value
      }
    });
    

    xhr.send(data);


    //clear text feilds
    document.getElementById("lat").value = "";
    document.getElementById("lng").value = "";
    document.getElementById("address").value = ""; 
    
    
         
  }
  

