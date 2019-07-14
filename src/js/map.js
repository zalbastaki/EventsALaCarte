const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${ MAPS_API_KEY }&libraries=places`;
script.type= 'text/javascript';
script.addEventListener('load', initMap);
document.getElementsByTagName('head')[0].appendChild(script);

function initMap () {
    const mapStyles = [
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "saturation": "-100"
                },
                {
                    "lightness": "57"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "lightness": "1"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "color": "#484848"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit.station.bus",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit.station.bus",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": "0"
                },
                {
                    "lightness": "0"
                },
                {
                    "gamma": "1.00"
                },
                {
                    "weight": "1"
                }
            ]
        },
        {
            "featureType": "transit.station.bus",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "saturation": "-100"
                },
                {
                    "weight": "1"
                },
                {
                    "lightness": "0"
                }
            ]
        },
        {
            "featureType": "transit.station.rail",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit.station.rail",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "gamma": "1"
                },
                {
                    "lightness": "40"
                }
            ]
        },
        {
            "featureType": "transit.station.rail",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "saturation": "-100"
                },
                {
                    "lightness": "30"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#d2d2d2"
                },
                {
                    "visibility": "on"
                }
            ]
        }
    ];
    
    const fallbackLatLng = {lat: 26.1352703, lng: 50.55641869999999};
    
    const map = new google.maps.Map(document.getElementById('map'), {
        center: fallbackLatLng,
        zoom: 15,
        styles: mapStyles,
    });
    
    const infoWindow = new google.maps.InfoWindow({
        content: 'Events Á La Carte'
    });
    
    const marker = new google.maps.Marker({
        position: fallbackLatLng,
        map: map,
        icon: '../img/mapsIcon.png',
    });
    
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
    
    const request = {
        placeId: MAPS_PLACE_ID,
        fields: ['geometry'],
    };
    
    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, callback);
    
    function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            const latlng = place.geometry.location;
            map.setCenter(latlng);
            marker.setPosition(latlng);
        }
    }
}
