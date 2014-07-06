

// flat maps are projections; hence, all projections have some distortion

// when using equirectangular approximation, the latitude and longitude of
// the earth are projected onto a flat map so that the Pythagorean Theorem
// can be used to find the distance between 2 points
	//	Pythagorean theorem: a^2 + b^2 = c^2
	// latitude and longitude values must be in radians


// CONVERTING LATITUDE AND LONGITUDE VALUES FROM DEGREES TO RADIANS //////
function degreesToRadians( deg ) {
	 return deg * Math.PI / 180;
}

// PROJECTING LATITUDE AND LONGITUDE VALUES ONTO A FLAT MAP //////////////
function PythagorasEquirectangular(lat1, lon1, lat2, lon2){
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
var userLat = currentUser.attributes.userGeo.latitude
var userLong = currentUser.attributes.userGeo.longitude

var cities= [
["city1", 10, 50, "blah" ],
["city2", 40, 60, "blah" ],
["city3", 25, 10, "blah" ],
["city4", 5,  80, "blah" ]
];

function closestPoint(latitude, longitude){
	var mindif=99999;
	var closest;

	for (index = 0; index < cities.length; ++index) {
		var dif =  PythagorasEquirectangular( userLat, userLong, cities[ index ][ 1 ], cities[ index ][ 2 ] );
			
		if (dif < mindif){
			closest=index;
			mindif = dif;
		}
	}

	console.log(cities[closest]);
}

closestPoint();