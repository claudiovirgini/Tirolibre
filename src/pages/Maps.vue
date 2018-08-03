<template>
<div id="map"></div>
</template>

<script>
import axios from 'axios'
import GoogleMapsLoader from 'google-maps'
export default {
  methods: {
    userList: function() {
      this.error = null;
      // ../static/data/country.json
      // http://35.193.9.82:121/api/Search/FindUser
      axios.get('../assets/map.json', {})
        .then(response => {
          console.log('userList Response:', response)
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          this.users = response.data
        })
        .catch(error => {
          // Request failed.
          console.log('error', error.response)
          this.error = error.response
        })
    },
    initMap(google) {
      var icons = {
        parking: {
          icon: 'https://tarantelleromane.files.wordpress.com/2016/10/map-marker.png?w=50'
        }
      };
      var airports = [{
          title: 'Manchester Airport',
          position: {
            lat: 53.3588026,
            lng: -2.274919
          },
          icon: 'parking',
          content: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Manchester Airport - from £30</h1><div id="bodyContent"><p><b>Manchester Airport</b> - 3 terminal airport offering flights to Europe and around the world with national rail connections.</p> <p><a href="https://www.google.co.uk">BOOK</a></p></div></div>'
        },
        {
          title: 'Leeds Airport',
          position: {
            lat: 53.8679434,
            lng: -1.6637193
          },
          icon: 'parking',
          content: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Leeds Airport - from £30</h1><div id="bodyContent"><p><b>Leeds Airport</b> - 3 terminal airport offering flights to Europe and around the world with national rail connections.</p> <p><a href="https://www.google.co.uk">BOOK</a></p></div></div>'
        },
        {
          title: 'Belfast Airport',
          position: {
            lat: 54.661781,
            lng: -6.2184331
          },
          icon: 'parking',
          content: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Belfast Airport - from £30</h1><div id="bodyContent"><p><b>Belfast Airport</b> - 3 terminal airport offering flights to Europe and around the world with national rail connections.</p> <p><a href="https://www.google.co.uk">BOOK</a></p></div></div>'
        },
        {
          title: 'Edinburgh Airport',
          position: {
            lat: 55.950785,
            lng: -3.3636419
          },
          icon: 'parking',
          content: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Edinburgh Airport - from £30</h1><div id="bodyContent"><p><b>Edinburgh Airport</b> - 3 terminal airport offering flights to Europe and around the world with national rail connections.</p> <p><a href="https://www.google.co.uk">BOOK</a></p></div></div>'
        },
        {
          title: 'Cardiff Airport',
          position: {
            lat: 51.3985498,
            lng: -3.3416461
          },
          icon: 'parking',
          content: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Cardiff Airport - from £30</h1><div id="bodyContent"><p><b>Cardiff Airport</b> - 3 terminal airport offering flights to Europe and around the world with national rail connections.</p> <p><a href="https://www.google.co.uk">BOOK</a></p></div></div>'
        },
        {
          title: 'Heathrow Airport',
          position: {
            lat: 51.4700223,
            lng: -0.4542955
          },
          icon: 'parking',
          content: '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Heathrow Airport - from £50</h1><div id="bodyContent"><p><b>Heathrow Airport</b> - 3 terminal airport offering flights to Europe and around the world with national rail connections.</p> <p><a href="https://www.google.co.uk">BOOK</a></p></div></div>'
        }
      ];
      var uk = {
        lat: 53.990221,
        lng: -3.911132
      };

      var myLatlng = new google.maps.LatLng(40.748817, -73.985428)
      var mapOptions = {
        zoom: 6,
        center: uk,
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
        title: 'Hello World!'
      })

      var InfoWindows = new google.maps.InfoWindow({});
      airports.forEach(function(airport) {
        var marker = new google.maps.Marker({
          position: {
            lat: airport.position.lat,
            lng: airport.position.lng
          },
          map: map,
          icon: icons[airport.icon].icon,
          title: airport.title
        });
        marker.addListener('mouseover', function() {
          InfoWindows.open(map, this);
          InfoWindows.setContent(airport.content);
        });
      });

      // To add the marker to the map, call setMap();
      marker.setMap(map)
    }
  },
  mounted() {
    this.userList()
    GoogleMapsLoader.KEY = 'AIzaSyAUa6Mc53UMsnzOZ6PQ_TXbM2_ozArfCUQ'
    GoogleMapsLoader.load((google) => {
      this.initMap(google)
    })
  }
}
</script>
