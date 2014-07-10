/* global Parse, _ */
'use strict';

var nearbyMice;
var nearestMouse;

///////////////////////////////////////////////////////////////////////////////////////////////////
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

// //defines the success callback
function geoSuccess(position) {
	var currentUser = Parse.User.current();
	var userLatitude = position.coords.latitude;
	var userLongitude = position.coords.longitude;
	var point = new Parse.GeoPoint({latitude: userLatitude, longitude: userLongitude});

	//"nearbyMice" is a collection of mice that are within a certain radius
		//nearbyMice.min is the mouse with the shortest distance to the user
	nearestMouse = nearbyMice.min(function(mouse){
	  //passing the user location and the nearbyMice collection through the getDistance function
	  return getDistance(Parse.User.current().get('userGeo'), mouse.get('mouseGeopoint')) * 0.000621371;
	})	

	console.log('The nearest mouse is ' + nearestMouse.attributes.mouseName + '.')

	// currentUser.set({
	// 	userGeo: point
	// });

	// currentUser.save();
	// console.log('Current user location saved. Latitude: ' + currentUser.attributes.userGeo.latitude + '. Longitude: '+ currentUser.attributes.userGeo.longitude + '.');
}

//defines the failure callback
function geoError() {
	alert('Your location could not be determined.');
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
	alert('You must sign in before tracking location.');
	console.log('Cannot track user location before log in.');
	}
}

//calls the trackUserLocation function
trackUserLocation();

///////////////////////////////////////////////////////////////////////////////////////////////////
// CONVERTING DEGREES TO RADIANS /////////////////////////////////////////

//converts latitude and longitude values so that they can be passed
//through the Haversine formula
var radians = function(x) {
  return x * Math.PI / 180;
};

///////////////////////////////////////////////////////////////////////////////////////////////////
// QUERYING FOR THE NEAREST POINT ////////////////////////////////////////

//names the user's geolocation so that it can be passed through a query
var userGeoPoint = currentUser.attributes.userGeo;
console.log('userGeoPoint is', userGeoPoint);

//defines a query that is used to fetch PlaceObjects
var query = new Parse.Query(Mouse);
//tells the query to look for locations near the user
query.withinMiles('mouseGeopoint', userGeoPoint, 10);
//limits the length of the returned array to 9
query.limit(9);
//finds all objects that match the restraints of the query
query.find({
	success: function(queryresults){
		console.log('Successfully retrieved ' + queryresults.length + ' results.');
		nearbyMice = new MouseCollection(queryresults);
	},
	error: function(error){
		console.log('There was an error calling the query function.');
	}
});

//queryresults will be an array of objects ordered by distance
//(nearest to farthest) from the user's location

//the object nearest to the user will be the first object in the array
//var closestMouse = queryresults.first();

///////////////////////////////////////////////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////////////////////////////////////////

//to find the distance between the user and the nearest mouse...
			//ansynchronus data needs to be ready
			//run this function when the xx view
//getDistance(Parse.User.current().get('userGeo'), nearestMouse.get('mouseGeopoint')) * 0.000621371;