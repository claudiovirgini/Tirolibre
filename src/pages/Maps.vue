<template>
<div id="map"></div>
</template>

<script>
import axios from 'axios'
import GoogleMapsLoader from 'google-maps'
export default {
  methods: {
    initMap(google) {
      var icons = {
        parking: {
          icon: 'https://tarantelleromane.files.wordpress.com/2016/10/map-marker.png?w=50'
        }
      };
      
      this.$store.dispatch('getTeamAroundPoint').then(res => {
        var teams =  res.data;
        var centerMap = {
          lat: 41.9027835,
          lng: 12.4963655
        };
        var myLatlng = new google.maps.LatLng(centerMap.lat, centerMap.lng)
        var mapOptions = {
          zoom: 6,
          center: centerMap,
          scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
          styles: [{
            'featureType': 'water',
            'stylers': [{
              'saturation': 43
            }, {
              'lightness': -11
            }, {
              'hue': '#0088ff'
            }]
          }, {
            'featureType': 'road',
            'elementType': 'geometry.fill',
            'stylers': [{
              'hue': '#ff0000'
            }, {
              'saturation': -100
            }, {
              'lightness': 99
            }]
          }, {
            'featureType': 'road',
            'elementType': 'geometry.stroke',
            'stylers': [{
              'color': '#808080'
            }, {
              'lightness': 54
            }]
          }, {
            'featureType': 'landscape.man_made',
            'elementType': 'geometry.fill',
            'stylers': [{
              'color': '#ece2d9'
            }]
          }, {
            'featureType': 'poi.park',
            'elementType': 'geometry.fill',
            'stylers': [{
              'color': '#ccdca1'
            }]
          }, {
            'featureType': 'road',
            'elementType': 'labels.text.fill',
            'stylers': [{
              'color': '#767676'
            }]
          }, {
            'featureType': 'road',
            'elementType': 'labels.text.stroke',
            'stylers': [{
              'color': '#ffffff'
            }]
          }, {
            'featureType': 'poi',
            'stylers': [{
              'visibility': 'off'
            }]
          }, {
            'featureType': 'landscape.natural',
            'elementType': 'geometry.fill',
            'stylers': [{
              'visibility': 'on'
            }, {
              'color': '#b8cb93'
            }]
          }, {
            'featureType': 'poi.park',
            'stylers': [{
              'visibility': 'on'
            }]
          }, {
            'featureType': 'poi.sports_complex',
            'stylers': [{
              'visibility': 'on'
            }]
          }, {
            'featureType': 'poi.medical',
            'stylers': [{
              'visibility': 'on'
            }]
          }, {
            'featureType': 'poi.business',
            'stylers': [{
              'visibility': 'simplified'
            }]
          }]

        }
        var map = new google.maps.Map(document.getElementById('map'), mapOptions)
        var marker = new google.maps.Marker({
          position: myLatlng,
          title: 'You Are HERE'
        })
        var InfoWindows = new google.maps.InfoWindow({});
        teams.forEach(function (team) {
          var marker = new google.maps.Marker({
            position: {
              lat: team.Latitudine,
              lng: team.Longitudine
            },
            map: map,
            //icon: 'parking',
            title: team.Name
          });
          marker.addListener('mouseover', function () {
            InfoWindows.open(map, this);
            var content = '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">' + team.TeamName + '</h1><div id="bodyContent"><p><b>' + team.FullAddress +'</b> - 3 terminal airport offering flights to Europe and around the world with national rail connections.</p> <p><a href="https://www.google.co.uk">BOOK</a></p></div></div>'
            InfoWindows.setContent(content);
          });
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map)
      }).catch(error =>
        alert('Si è verificato un errore'));

      //var airports = [{
      //    title: 'Manchester Airport',
      //    position: {
      //      lat: 53.3588026,
      //      lng: -2.274919
      //    },
      //    icon: 'parking',
      //    content: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Manchester Airport - from £30</h1><div id="bodyContent"><p><b>Manchester Airport</b> - 3 terminal airport offering flights to Europe and around the world with national rail connections.</p> <p><a href="https://www.google.co.uk">BOOK</a></p></div></div>'
      //  },
      //  {
      //    title: 'Leeds Airport',
      //    position: {
      //      lat: 53.8679434,
      //      lng: -1.6637193
      //    },
      //    icon: 'parking',
      //    content: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Leeds Airport - from £30</h1><div id="bodyContent"><p><b>Leeds Airport</b> - 3 terminal airport offering flights to Europe and around the world with national rail connections.</p> <p><a href="https://www.google.co.uk">BOOK</a></p></div></div>'
      //  },
      //  {
      //    title: 'Belfast Airport',
      //    position: {
      //      lat: 54.661781,
      //      lng: -6.2184331
      //    },
      //    icon: 'parking',
      //    content: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Belfast Airport - from £30</h1><div id="bodyContent"><p><b>Belfast Airport</b> - 3 terminal airport offering flights to Europe and around the world with national rail connections.</p> <p><a href="https://www.google.co.uk">BOOK</a></p></div></div>'
      //  },
      //  {
      //    title: 'Edinburgh Airport',
      //    position: {
      //      lat: 55.950785,
      //      lng: -3.3636419
      //    },
      //    icon: 'parking',
      //    content: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Edinburgh Airport - from £30</h1><div id="bodyContent"><p><b>Edinburgh Airport</b> - 3 terminal airport offering flights to Europe and around the world with national rail connections.</p> <p><a href="https://www.google.co.uk">BOOK</a></p></div></div>'
      //  },
      //  {
      //    title: 'Cardiff Airport',
      //    position: {
      //      lat: 51.3985498,
      //      lng: -3.3416461
      //    },
      //    icon: 'parking',
      //    content: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Cardiff Airport - from £30</h1><div id="bodyContent"><p><b>Cardiff Airport</b> - 3 terminal airport offering flights to Europe and around the world with national rail connections.</p> <p><a href="https://www.google.co.uk">BOOK</a></p></div></div>'
      //  },
      //  {
      //    title: 'Heathrow Airport',
      //    position: {
      //      lat: 51.4700223,
      //      lng: -0.4542955
      //    },
      //    icon: 'parking',
      //    content: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Heathrow Airport - from £50</h1><div id="bodyContent"><p><b>Heathrow Airport</b> - 3 terminal airport offering flights to Europe and around the world with national rail connections.</p> <p><a href="https://www.google.co.uk">BOOK</a></p></div></div>'
      //  }
      //];





  

    }
  },
  mounted() {
    GoogleMapsLoader.KEY = 'AIzaSyAUa6Mc53UMsnzOZ6PQ_TXbM2_ozArfCUQ'
    GoogleMapsLoader.load((google) => {
      this.initMap(google)
    })
  }
}
</script>
