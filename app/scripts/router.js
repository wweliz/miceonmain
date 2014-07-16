/* global Parse */
'use strict';

var userGeoPoint;
var mouseQuery = new Parse.Query(Mouse);
var nearbyMice;
var nearestMouse;
var distToMouse;

//////////////////////////////////////////////////////////////////////////
// THE APP ROUTER ////////////////////////////////////////////////////////
var AppRouter = Parse.Router.extend({
	routes: {
		//URL to match		//function called when the hash matches
		''								: 'renderSplashPage',				//	url/#
		'signup'					: 'renderSignUp',						//	url/#signup
		'login'						: 'renderLogIn',						//	url/#login
		'userview'				: 'renderUserHome',					//	url/#userview
		'mouseview'				: 'renderClosestMouse',			//	url/#mouseview
		'mousephoto'			: 'renderSingleMouse',			//	url/#mousephoto
		'mousereward'			: 'renderMouseReward',			//	url/#mousereward
		'mousegallery'		: 'renderMouseGallery',			//	url/#mousegallery
		'rewardgallery'		: 'renderAllRewards',				//	url/#rewardgallery
		'micehistory'			: 'renderMiceHistory',			//	url/#micehistory
		'usersettings'		: 'renderUserSettings',			//	url/#usersettings
		'congrats'				: 'renderCongrats',					//	url/#congrats		
	},

	initialize: function(){
		//pairs with the swap function
		this.currentView = null;

		this.checkGeoSuport();
		this.fetchMice();

		// if there is a currently logged in user...
		if ( Parse.User.current() ) {
			//router redirects to the UserHomeView
			this.navigate('userview', {trigger: true});

		// if there is NOT a currently logged in user...
		} else {
			//router redirects to the SplashView
			this.navigate('', {trigger: true});
		}

		// create a deferred that some views will depend on resolution for.
		window.trackingPromise = $.Deferred();
		//calls the render function (this will resolve trackingPromise when done)
		this.trackUserLocation();
	},

	////////////////////////////////////////////////////////////////////////
	// REDIRECT TO SIGN UP IF NO CURRENT USER //////////////////////////////
  redirectToSignup: function(){
  	this.navigate('signup', {trigger: true});
  },

	////////////////////////////////////////////////////////////////////////
	// DETERMINING DEVICE SUPPORT FOR GEOLOCATION //////////////////////////
	checkGeoSuport: function() {
		if (Modernizr.geolocation) {
			//console.log('This device supports geolocation.');
		} else {
			console.log('This device does not support geolocation.');
		}
	},

	////////////////////////////////////////////////////////////////////////
	// FETCHING THE MOUSE COLLECTION ///////////////////////////////////////
	fetchMice: function(){
		//fetches the mice collection
		mice.fetch({
			success: function(collection){
				//console.log('The mice collection was successfully fetched.');
			},
			error: function(collection, error){
				console.log('The mice collection could not be retrieved.');
			}
		});
	},

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

geoSuccess: function(position) {
	var userLatitude = position.coords.latitude;
	var userLongitude = position.coords.longitude;
	userGeoPoint = new Parse.GeoPoint({latitude: userLatitude, longitude: userLongitude});

	console.log('Current user location is: latitude:' + userGeoPoint._latitude + ', longitude:'+ userGeoPoint._longitude + '.');

	//tells the query to look for locations within 10 miles of the user
	mouseQuery.withinMiles('mouseGeopoint', userGeoPoint, 10);
	//limits the length of the returned array to 9
	mouseQuery.limit(9);
	//finds all objects that match the restraints of the query
	mouseQuery.find(querySuccess, queryError);
},

//queryresults will be an array of objects ordered by distance
//(nearest to farthest) from the user's location

//////////////////////////////////////////////////////////////////////////
// DEFINING THE USER LOCATION FAILURE CALLBACK ///////////////////////////
geoError: function() {
	alert('Your location could not be determined.');
	console.log('Your location could not be determined.');
},

//////////////////////////////////////////////////////////////////////////
// DEFINING THE TRACK USER LOCATION FUNCTION /////////////////////////////
trackUserLocation: function() {
	// if there is a currently logged in user...
if ( Parse.User.current() ) {
		//passes the success and failure callbacks through the watchPosition function
			navigator.geolocation.watchPosition(this.geoSuccess, this.geoError, {enableHighAccuracy: true});
	// if there is NOT a currently logged in user...
} else {
	console.log('Cannot track user location before log in.');
	}
},





	////////////////////////////////////////////////////////////////////////
	// RENDERING VIEWS /////////////////////////////////////////////////////
	renderSplashPage: function(){
		this.swap( new SplashView() );
	},

	renderSignUp: function(){
		this.swap( new SignUpView() );
	},

	renderLogIn: function(){
		this.swap( new LogInView() );
  },

	renderUserHome: function(){
		trackingPromise.done(function(){
			if ( Parse.User.current() === null ){
				this.redirectToSignup();
			} else {
		  	//instantiate the UserHomeView with the current user as the model
		  	this.swap( new UserHomeView({model: Parse.User.current().attributes}) );
			}
		}.bind(this));
  },

  renderClosestMouse: function(){
  	trackingPromise.done(function(){
			if ( Parse.User.current() === null ){
				this.redirectToSignup();
			} else {
				this.swap( new ClosestMouseView() );
			}
		}.bind(this));

  },

  renderSingleMouse: function(){
  	if ( Parse.User.current() === null ){
			this.redirectToSignup();
		} else {
			this.swap( new MousePhotoView() );
		}
  },

  renderMouseReward: function(){
  	if ( Parse.User.current() === null ){
			this.redirectToSignup();
		} else {
			this.swap( new MouseRewardView() );
		}
  },

  renderMouseGallery: function(){
  	if ( Parse.User.current() === null ){
			this.redirectToSignup();
		} else {
			this.swap( new MouseGalleryView() );
		}
  },

  renderAllRewards: function(){
  	if ( Parse.User.current() === null ){
			this.redirectToSignup();
		} else {
			this.swap( new AllRewardsView() );
		}
  },

	renderUserSettings: function(){
		if ( Parse.User.current() === null ){
			this.redirectToSignup();
		} else {
			this.swap( new UserSettingsView() );
		}
  },

  renderMiceHistory: function(){
		this.swap( new MouseHistoryView() );
  },

	renderCongrats: function(){
		this.swap( new CongratulationsView() );
  },

  ////////////////////////////////////////////////////////////////////////
	// SWAP VIEW FUNCTION //////////////////////////////////////////////////
	swap: function(view){
    if (this.currentView)
    	this.currentView.remove();
    		//removing a view from the DOM calls stopListening, which stops
    		//the view from listening to any bound events
    	this.currentView = view;
    	this.currentView.render();
  }

});

//////////////////////////////////////////////////////////////////////////
// INSTANTIATING THE ROUTER //////////////////////////////////////////////
var router = new AppRouter();
Parse.history.start();