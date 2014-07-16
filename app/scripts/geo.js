/* global Parse, _ */
'use strict';

var userGeoPoint;
var mouseQuery = new Parse.Query(Mouse);
var nearbyMice;
var nearestMouse;
var distToMouse;

//////////////////////////////////////////////////////////////////////////
// DEFINING THE QUERY SUCCESS CALLBACK ///////////////////////////////////
function querySuccess(queryresults) {
	//console.log('Successfully retrieved ' + queryresults.length + ' results.');
	nearbyMice = new MouseCollection(queryresults);
	findNearestMouse();
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

	milesToNearestMouse();

	//console.log('The nearest mouse is ' + nearestMouse.attributes.mouseName + '.');
}

//////////////////////////////////////////////////////////////////////////
// FINDING THE DISTANCE TO THE NEAREST MOUSE /////////////////////////////
function milesToNearestMouse() {
		// 1 meter = 0.000621371 miles
	distToMouse = getDistance(userGeoPoint, nearestMouse.get('mouseGeopoint')) * 0.000621371;
	console.log(nearestMouse.attributes.mouseName + ' is ' + distToMouse + ' miles away.');

	window.trackingPromise.resolve();
}
