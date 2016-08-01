function initMap() {
  if ($("#map").length === 0) return;

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 53.1280137, lng: -1.5884946},
    scrollwheel:  false,
    draggable: false,
    disableDoubleClickZoom: true,
    panControl: false,
    streetViewControl: false,
    disableDefaultUI: true
  });
  directionsDisplay.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsDisplay);

  google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var waypts = [
    { // Wadebridge, Cornwall
      location: new google.maps.LatLng("50.5163356","-4.8563235"),
      stopover: false
    },
    // { // Torrington, Devon
    //   location: new google.maps.LatLng("50.9551317","-4.160616"),
    //   stopover: false
    // },
    { // Draycott, Somerset
      location: new google.maps.LatLng("51.2548924","-2.7609042"),
      stopover: false
    },
    // { // Kerne Bridge, Herefordshire
    //   location: new google.maps.LatLng("51.8675607","-2.6167956"),
    //   stopover: false
    // },
    { // Much Wenlock, Shropshire
      location: new google.maps.LatLng("52.5964567","-2.578688"),
      stopover: false
    },
    // { // Lymm, Cheshire
    //   location: new google.maps.LatLng("53.3758952","-2.5141697"),
    //   stopover: false
    // },
    { // Bentham, Lancashire
      location: new google.maps.LatLng("54.1185887","-2.5253186"),
      stopover: false
    },
    // { // Brampton, Cumbria
    //   location: new google.maps.LatLng("54.938158","-2.801354"),
    //   stopover: false
    // },
    { // Peebles, Tweeddale
      location: new google.maps.LatLng("55.6539588","-3.2046535"),
      stopover: false
    },
    // { // Dollar, Clackmannanshire
    //   location: new google.maps.LatLng("56.1650768","-3.6897878"),
    //   stopover: false
    // },
    { // Spittal of Glenshee, Perthshire
      location: new google.maps.LatLng("56.8114608","-3.4789556"),
      stopover: false
    },
    // { // Grantown-on-Spey, Moray
    //   location: new google.maps.LatLng("57.3293565","-3.6282173"),
    //   stopover: false
    // },
    // { // Lairg, Sutherland
    //   location: new google.maps.LatLng("58.0248831","-4.4165752"),
    //   stopover: false
    // },
    { // Melvich, Sutherland
      location: new google.maps.LatLng("58.5554487","-3.9381336"),
      stopover: false
    }
  ];

  directionsService.route({
    origin: "50.0636344,-5.7145217",
    destination: "58.636691,-3.0827024",
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') return directionsDisplay.setDirections(response);
    console.error('Directions request failed due to ' + status);
  });
}
