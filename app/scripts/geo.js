/* global Parse, _ */
'use strict';

var currentUser = Parse.User.current();
var userGeoPoint;
var mouseQuery = new Parse.Query(Mouse);
var nearbyMice;
var nearestMouse;
var distToMouse;

//////////////////////////////////////////////////////////////////////////
// TRACKING THE CURRENT USER'S LOCATION //////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////
// DEFINING THE USER LOCATION SUCCESS CALLBACK ///////////////////////////
// DEFINING THE NEAREST POINT QUERY //////////////////////////////////////

function geoSuccess(position) {
	var currentUser = Parse.User.current();
	var userLatitude = position.coords.latitude;
	var userLongitude = position.coords.longitude;
	userGeoPoint = new Parse.GeoPoint({latitude: userLatitude, longitude: userLongitude});

	console.log('Current user location is: latitude:' + userGeoPoint._latitude + ', longitude:'+ userGeoPoint._longitude + '.');

	//tells the query to look for locations within 10 miles of the user
	mouseQuery.withinMiles('mouseGeopoint', userGeoPoint, 10);
	//limits the length of the returned array to 9
	mouseQuery.limit(9);
	//finds all objects that match the restraints of the query
}

//queryresults will be an array of objects ordered by distance
//(nearest to farthest) from the user's location

//////////////////////////////////////////////////////////////////////////
// DEFINING THE USER LOCATION FAILURE CALLBACK ///////////////////////////
function geoError() {
	alert('Your location could not be determined.');
	console.log('Your location could not be determined.');
}

//////////////////////////////////////////////////////////////////////////
// DEFINING THE TRACK USER LOCATION FUNCTION /////////////////////////////
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

//////////////////////////////////////////////////////////////////////////
// DEFINING THE QUERY SUCCESS CALLBACK ///////////////////////////////////
function querySuccess(queryresults) {
	console.log('Successfully retrieved ' + queryresults.length + ' results.');
	nearbyMice = new MouseCollection(queryresults);
}

//////////////////////////////////////////////////////////////////////////
// DEFINING THE QUERY FAILURE CALLBACK ///////////////////////////////////
function queryError(error) {
	console.log('There was an error calling the query function.');
}

//////////////////////////////////////////////////////////////////////////
// CONVERTING DEGREES TO RADIANS /////////////////////////////////////////

//converts latitude and longitude values so that they can be passed
//through the Haversine formula
var radians = function(x) {
  return x * Math.PI / 180;
};

//////////////////////////////////////////////////////////////////////////
// FINDING THE DISTANCE BETWEEN LOCATIONS ////////////////////////////////
// THE HAVERSINE FORMULA ////////////////////////

var getDistance = function(p1, p2) {
  //"R" represents Earth’s mean radius in meters
  var R = 6378137; 

  var dLat = radians(p2.latitude - p1.latitude);
  var dLong = radians(p2.longitude - p1.longitude);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radians(p1.latitude)) * Math.cos(radians(p2.latitude)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  //"d" represents the distance between 2 points in meters
  return d;
};

//////////////////////////////////////////////////////////////////////////
// FINDING THE NEAREST MOUSE /////////////////////////////////////////////
function findNearestMouse() {
	//nearbyMice.min is the mouse with the shortest distance to the user
	nearestMouse = nearbyMice.min(function(mouse){
  	//passing the user location and the nearbyMice collection through the getDistance function
  		// 1 meter = 0.000621371 miles
  	return getDistance(userGeoPoint, mouse.get('mouseGeopoint')) * 0.000621371;
	});

	console.log('The nearest mouse is ' + nearestMouse.attributes.mouseName + '.');
}

//////////////////////////////////////////////////////////////////////////
// FINDING THE DISTANCE TO THE NEAREST MOUSE /////////////////////////////
function milesToNearestMouse() {
		// 1 meter = 0.000621371 miles
	distToMouse = getDistance(userGeoPoint, nearestMouse.get('mouseGeopoint')) * 0.000621371;
	console.log('The nearest mouse is ' + distToMouse + ' miles away.');
}


// trackUserLocation();
// mouseQuery.find(querySuccess, queryError);
// findNearestMouse();
// milesToNearestMouse();