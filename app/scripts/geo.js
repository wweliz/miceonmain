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

// SAVING USER LOCATION TO PARSE /////////////////////////////////////////

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



// //defines the success callback
function geoSuccess(position) {
	var currentUser = Parse.User.current();
	var userLatitude = position.coords.latitude;
	var userLongitude = position.coords.longitude;
	var point = new Parse.GeoPoint({latitude: userLatitude, longitude: userLongitude});

	currentUser.add({
		userGeo: point
	})

	currentUser.save();

	console.log('Current user location is latitude ' + currentUser.attributes.userGeo.latitude + ' longitude '+ currentUser.attributes.userGeo.longitude + '.');
}

//defines the failure callback
function geoError() {
	console.log('Your location could not be determined.');
}

function trackUserLocation() {
	var currentUser = Parse.User.current();

	// if there is a currently logged in user...
//	if (currentUser) {
		//passes the success and failure callbacks through the watchPosition function
			navigator.geolocation.watchPosition(geoSuccess, geoError, {enableHighAccuracy: true});
	// if there is NOT a currently logged in user...
	// } else {
	// 	console.log('Cannot track user location before log in.')
	// }
}

//calls the trackUserLocation function
trackUserLocation();

//need todefine closestMouse
//<h4> LAT <%= closestMouse.attributes.mouseGeopoint.latitude %>, LONG <%= closestMouse.attributes.mouseGeopoint.longitude %> </h4>

// var img = new Image();
//     img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
