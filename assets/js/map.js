function initMap() {
  if ($("#map").length === -1) return;

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 53.1280137, lng: -1.5884946},
    scrollwheel:  false,
    draggable: false
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
      value: "50.5163356,-4.8563235",
      stopover: true
    },
    { // Torrington, Devon
      value: "50.9551317,-4.160616",
      stopover: true
    },
    { // Draycott, Somerset
      value: "51.2548924,-2.7609042",
      stopover: true
    },
    { // Kerne Bridge, Herefordshire
      value: "51.8675607,-2.6167956",
      stopover: true
    },
    { // Much Wenlock, Shropshire
      value: "52.5964567,-2.578688",
      stopover: true
    },
    { // Lymm, Cheshire
      value: "53.3758952,-2.5141697",
      stopover: true
    },
    { // Bentham, Lancashire
      value: "54.1185887,-2.5253186",
      stopover: true
    },
    { // Brampton, Cumbria
      value: "54.938158,-2.801354",
      stopover: true
    },
    { // Peebles, Tweeddale
      value: "55.6539588,-3.2046535",
      stopover: true
    },
    { // Dollar, Clackmannanshire
      value: "56.1650768,-3.6897878",
      stopover: true
    },
    { // Spittal of Glenshee, Perthshire
      value: "56.8114608,-3.4789556",
      stopover: true
    },
    { // Grantown-on-Spey, Moray
      value: "57.3293565,-3.6282173",
      stopover: true
    },
    { // Lairg, Sutherland
      value: "58.0248831,-4.4165752",
      stopover: true
    },
    { // Melvich, Sutherland
      value: "58.5554487,-3.9381336",
      stopover: true
    }
  ];

  directionsService.route({
    origin: "50.0636344,-5.7145217",
    destination: "58.636691,-3.0827024",
    waypoints: [],
    optimizeWaypoints: true,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') return directionsDisplay.setDirections(response);
    console.error('Directions request failed due to ' + status);
  });
}
