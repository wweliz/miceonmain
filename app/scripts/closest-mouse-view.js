/* global Parse, _ */
//'use strict';

// mice.fetch().done(function(){
// 	console.log('closestMouse is', closestMouse);
// });

// CONVERTING LATITUDE AND LONGITUDE VALUES FROM DEGREES TO RADIANS //////
function degreesToRadians( deg ) {
	 'use strict';
	 return deg * Math.PI / 180;
}

// // PROJECTING LATITUDE AND LONGITUDE VALUES ONTO A FLAT MAP //////////////
function PythagorasEquirectangular(lat1, lon1, lat2, lon2){
	'use strict';

	lat1 = degreesToRadians(lat1);
	lat2 = degreesToRadians(lat2);
	lon1 = degreesToRadians(lon1);
	lon2 = degreesToRadians(lon2);
	
	var R = 6371;		//R represents Earth's radius -- approx. 6371 km
	var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
	var y = (lat2-lat1);
	var d = Math.sqrt(x*x + y*y) * R;
	
	return d;
}

// FINDING THE CLOSEST POINT WHEN GIVEN A USER'S GEOLOCATION /////////////

//naming the value of user's latitude and longitude
var userLat = currentUser.attributes.userGeo.latitude;
var userLong = currentUser.attributes.userGeo.longitude;

//callback function for asynchronous call to HTML5 geolocation
function UserLocation(userLat, userLong){
  'use strict';
  closestPoint(userLat, userLong);
}

var cities= [
	['city1', 10, 50, 'blah'],
	['city2', 40, 60, 'blah'],
	['city3', 25, 10, 'blah'],
	['city4', 5,  80, 'blah']
];

function closestPoint(userLat, userLong){
	var mindif=99999;
	var closest;

	for (index = 0; index < cities.length; ++index) {
		var dif =  PythagorasEquirectangular(userLat, userLong, cities[index][1], cities[index][2]);
			
		if (dif < mindif){
			closest=index;
			mindif = dif;
		}
	}

	return cities[closest]
}

var closestMouse = closestPoint(userLat, userLong);
console.log('closestMouse is:', closestMouse);


// CLOSEST MOUSE VIEW ////////////////////////////////////////////////////
var ClosestMouseView = Parse.View.extend({
	mouseTemplate: _.template($('.mouse-view-template').text()),

	events: {
		//'click .upload-mouse-photo-btn'	: 'uploadMousePhoto',
	},

	initialize: function(){
		//appends mouse-view div with contents of the user-home-template
		$('.closest-mouse-view').append(this.el);

		//calls the render function
		this.render();
	},

	render: function(){
		this.$el.html(this.mouseTemplate());
		return this;
	},

	uploadMousePhoto: function(){
		//do things
	}

});