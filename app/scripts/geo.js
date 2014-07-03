/* global Parse, _, currentUser */
'use strict';

// DETERMINING DEVICE SUPPORT FOR GEOLOCATION ////////////////////////////

function checkGeoSuport() {
  if (Modernizr.geolocation) {
	  console.log('This device supports geolocation.');
  } else {
    // no native support; maybe try a fallback?
    alert('This device does not support geolocation.');
    console.log('This device does not support geolocation.');
  }
}

checkGeoSuport();

// DETERMINING DEVICE LOCATION ///////////////////////////////////////////

//defines the success callback
function geoSuccess(position) {
	var latitude = position.coords.latitude;
		console.log('Latitude: ', latitude);

	var longitude = position.coords.longitude;
		console.log('Longitude: ', longitude);
}

//defines the success callback
function geoError() {
	console.log('Your location could not be determined.');
}

//passes the success and failure callbacks through the function
		// first arg:						success callback [geoSuccess]
		// second arg: 					failure callback [geoError]
		// optional third arg:	PositionOptions object
															// property:	enableHighAccuracy
															// type: Boolean
															// default: false

//navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

navigator.geolocation.watchPosition(geoSuccess, geoError);