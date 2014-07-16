/* global Parse, _ */
'use strict';

var userGeoPoint,
		mouseQuery = new Parse.Query(Mouse),
		nearbyMice,
		nearestMouse,
		distToMouse,
		foundMiceCollection,
		foundMiceIds,
		foundMice,
		allMiceIds,
		diffIds,
		missingMice;

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

//////////////////////////////////////////////////////////////////////////
// FOUND MICE & REMAINING MICE QUERY /////////////////////////////////////

Parse.User.current().relation('miceFound').query().find().done(function(queryresults){
	//foundMiceCollection will be a collection of found mice
	foundMiceCollection = queryresults;
	// this is a global promise for when the mice are fetched
	//console.log('foundMiceCollection is', foundMiceCollection);
	return miceFetched;

	}).done(function(mice){
		//foundMiceIds will be an array of the found mice ids
		foundMiceIds = _.pluck(foundMiceCollection, "id");
		//console.log('foundMiceIds is', foundMiceIds);

		foundMice = foundMiceIds.map(function(id){
			return mice.get(id);
		})

		//allMiceIds will be an array of all the mice ids
		allMiceIds = _.pluck(mice.models, "id");
		//console.log('allMiceIds is', allMiceIds);

		//diffIds will be an array of the remaining (not found) mice ids
		diffIds = _.difference(allMiceIds, foundMiceIds);
		//console.log('diffIds is', diffIds);

		missingMice = diffIds.map(function(id){
			return mice.get(id);
		})
	
	console.log('foundMice is ', foundMice);
	console.log('missingMice is ', missingMice);

});
