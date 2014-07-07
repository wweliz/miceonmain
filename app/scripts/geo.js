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
	});

	currentUser.save();

	console.log('Current user location saved. Latitude: ' + currentUser.attributes.userGeo.latitude + '. Longitude: '+ currentUser.attributes.userGeo.longitude + '.');
}

//defines the failure callback
function geoError() {
	console.log('Your location could not be determined.');
}

function trackUserLocation() {
	var currentUser = Parse.User.current();

	// if there is a currently logged in user...
if (currentUser) {
		//passes the success and failure callbacks through the watchPosition function
			navigator.geolocation.watchPosition(geoSuccess, geoError, {enableHighAccuracy: true});
	// if there is NOT a currently logged in user...
} else {
	console.log('Cannot track user location before log in.');
	}
}

//calls the trackUserLocation function
trackUserLocation();

// FINDING THE CLOSEST POINT /////////////////////////////////////////////

	//names the user's geolocation so that it can be passed through a query
var userGeoPoint = currentUser.attributes.userGeo;

var placeObject = new Parse.Object();
	//placeObject.set('location', userGeoPoint);

	//defines a query that is used to fetch PlaceObjects
var query = new Parse.Query(PlaceObject);
	//tells the query to look for locations near the user
query.near('location', userGeoPoint);
	//limits the length of the returned array to 9
query.limit(9);
	//finds all objects that match the restraints of the query
query.find({
  success: function(placesObjects){
  	console.log('placesObjects:', placesObjects);
  },
  error: function(error){
    console.log('There was an error calling the query function.');
  }
});

//placesObjects will be an array of objects ordered by distance
//(nearest to farthest) from the user's location

//the object nearest to the user will be the first object in the array
var closestMouse = placesObjects.first();