var geocoder;
var map;
var marker;

// initialise the google maps objects, and add listeners
function gmaps_init(){

    // center of the universe
    // New delhi 28.6100° N, 77.2300
    var latlng = new google.maps.LatLng(28.6100,77.2300);

    var options = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // create our map object
    map = new google.maps.Map(document.getElementById("gmaps-canvas"), options);

    // the geocoder object allows us to do latlng lookup based on address
    geocoder = new google.maps.Geocoder();

    // the marker shows us the position of the latest address
    marker = new google.maps.Marker({
        map: map,
        draggable: true
    });

// Try HTML5 geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);

            var infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos
            });
            map.setCenter(pos);
            marker.setPosition(pos);
            set_location_values(position.coords.latitude, position.coords.longitude);
        });
    }




    // event triggered when marker is dragged and dropped
    google.maps.event.addListener(marker, 'dragend', function() {
        geocode_lookup( 'latLng', marker.getPosition() );
    });

    // event triggered when map is clicked
    google.maps.event.addListener(map, 'click', function(event) {
        marker.setPosition(event.latLng)
        set_location_values(event.latLng.lat(), event.latLng.lng())
        geocode_lookup( 'latLng', event.latLng  );
    });

    $('#gmaps-error').hide();
}

// move the marker to a new position, and center the map on it
function update_map( geometry ) {
    map.fitBounds( geometry.viewport )
    marker.setPosition( geometry.location )
    set_location_values(geometry.location.lat(), geometry.location.lng())
}

// fill in the UI elements with new position data
function update_ui( address, latLng ) {
    $('#incident_location').autocomplete("close");
    $('#incident_location').val(address);
    //$('#gmaps-output-latitude').html(latLng.lat());
    //$('#gmaps-output-longitude').html(latLng.lng());
}

// Query the Google geocode object
//
// type: 'address' for search by address
//       'latLng'  for search by latLng (reverse lookup)
//
// value: search query
//
// update: should we update the map (center map and position marker)?
function geocode_lookup( type, value, update ) {
    // default value: update = false
    update = typeof update !== 'undefined' ? update : false;

    request = {};
    request[type] = value;

    geocoder.geocode(request, function(results, status) {
        $('#gmaps-error').html('');
        $('#gmaps-error').hide();
        if (status == google.maps.GeocoderStatus.OK) {
            // Google geocoding has succeeded!
            if (results[0]) {
                // Always update the UI elements with new location data
                update_ui( results[0].formatted_address,
                    results[0].geometry.location )

                // Only update the map (position marker and center map) if requested
                if( update ) { update_map( results[0].geometry ) }
            } else {
                // Geocoder status ok but no results!?
                $('#gmaps-error').html("Sorry, something went wrong. Try again!");
                $('#gmaps-error').show();
            }
        } else {
            // Google Geocoding has failed. Two common reasons:
            //   * Address not recognised (e.g. search for 'zxxzcxczxcx')
            //   * Location doesn't map to address (e.g. click in middle of Atlantic)

            if( type == 'address' ) {
                // User has typed in an address which we can't geocode to a location
                $('#gmaps-error').html("Sorry! We couldn't find " + value + ". Try a different search term, or click the map." );
                $('#gmaps-error').show();
            } else {
                // User has clicked or dragged marker to somewhere that Google can't do a reverse lookup for
                // In this case we display a warning, clear the address box, but fill in LatLng
                $('#gmaps-error').html("Woah... that's pretty remote! You're going to have to manually enter a place name." );
                $('#gmaps-error').show();
                update_ui('', value)
            }
        };
    });
};

function set_location_values(lat, long){
    $("#incident_latitude").val(lat);
    $("#incident_longitude").val(long);
};

// initialise the jqueryUI autocomplete element
function autocomplete_init() {
    $("#incident_location").autocomplete({

        // source is the list of input options shown in the autocomplete dropdown.
        // see documentation: http://jqueryui.com/demos/autocomplete/
        source: function(request,response) {

            // the geocode method takes an address or LatLng to search for
            // and a callback function which should process the results into
            // a format accepted by jqueryUI autocomplete
            geocoder.geocode( {'address': request.term }, function(results, status) {
                response($.map(results, function(item) {
                    return {
                        label: item.formatted_address, // appears in dropdown box
                        value: item.formatted_address, // inserted into input element when selected
                        geocode: item                  // all geocode data: used in select callback event
                    }
                }));
            })
        },

        // event triggered when drop-down option selected
        select: function(event,ui){
            update_ui(  ui.item.value, ui.item.geocode.geometry.location )
            update_map( ui.item.geocode.geometry )
        }
    });

    // triggered when user presses a key in the address box
    $("#incident_location").bind('keydown', function(event) {
        if(event.keyCode == 13) {
            geocode_lookup( 'address', $('#incident_location').val(), true );

            // ensures dropdown disappears when enter is pressed
            $('#incident_location').autocomplete("disable")
        } else {
            // re-enable if previously disabled above
            $('#incident_location').autocomplete("enable")
        }
    });
}; // autocomplete_init

$(document).ready(function() {
    var jq = $.noConflict();
    $('[data-behaviour~=datepicker]').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true
    });

    if( $('#gmaps-canvas').length  ) {
        gmaps_init();
        autocomplete_init();
    };

    if( $('#gmaps-canvas2').length  ) {
        gmaps_init();
    };



});


