/* global Parse, _ */
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

//there are two methods to get the current position of the device:
	//navigator.geolocation.getCurrentPosition()
			//returns the device position ONCE when called
	//navigator.geolocation.watchPosition()
			//returns the device position EACH TIME the device position changes

//both take 3 arguements:
	// first arg:						success callback [geoSuccess]
	// second arg: 					failure callback [geoError]
	// optional third arg:	PositionOptions object
													// property:	enableHighAccuracy
													// type: Boolean
													// default: false

//defines the success callback
function geoSuccess(position) {
	var latitude = position.coords.latitude;
		console.log('Latitude: ', latitude);

	var longitude = position.coords.longitude;
		console.log('Longitude: ', longitude);
}

//defines the failure callback
function geoError() {
	console.log('Your location could not be determined.');
}

//passes the success and failure callbacks through the function
navigator.geolocation.watchPosition(geoSuccess, geoError, {enableHighAccuracy: true});