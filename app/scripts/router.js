/* global Parse, _, currentUser */
'use strict';

// DEFINING UNIVERSAL VARIABLES //////////////////////////////////////////
var nearbyMice;
var nearestMouse;

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
		'logout'					: 'renderLogOut'						//	url/#logout
	},

	initialize: function(){
		var currentUser = Parse.User.current();

		this.checkGeoSuport();

		// if there is a currently logged in user...
		if (currentUser) {
			this.trackUserLocation();
			//router redirects to the UserHomeView
			this.navigate('userview', {trigger: true});

		// if there is NOT a currently logged in user...
		} else {
			//router redirects to the SplashView
			this.navigate('', {trigger: true});
		}
	},

	////////////////////////////////////////////////////////////////////////
	// REDIRECT TO SIGN UP IF NO CURRENT USER //////////////////////////////
  redirectToSignup: function(){
  	router.navigate('signup', {trigger: true});
  },

	////////////////////////////////////////////////////////////////////////
	// DETERMINING DEVICE SUPPORT FOR GEOLOCATION //////////////////////////
	checkGeoSuport: function() {
		if (Modernizr.geolocation) {
			console.log('This device supports geolocation.');
		} else {
			// no native support; maybe try a fallback?
			alert('This device does not support geolocation.');
			console.log('This device does not support geolocation.');
		}
	},

	////////////////////////////////////////////////////////////////////////
	// TRACKING THE CURRENT USER'S LOCATION ////////////////////////////////

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

	////////////////////////////////////////////////////////////////////////
	// DEFINING THE SUCCESS CALLBACK ///////////////////////////////////////
	geoSuccess: function(position) {
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
	},

	////////////////////////////////////////////////////////////////////////
	// DEFINING THE FAILURE CALLBACK ///////////////////////////////////////
	geoError: function() {
		alert('Your location could not be determined.');
		console.log('Your location could not be determined.');
	},

	////////////////////////////////////////////////////////////////////////
	// TRACKING THE CURRENT USER'S LOCATION ////////////////////////////////
	trackUserLocation: function() {
		var currentUser = Parse.User.current();

		// if there is a currently logged in user...
		if (currentUser) {
			//passes the success and failure callbacks through the watchPosition function
			navigator.geolocation.watchPosition(this.geoSuccess, this.geoError, {enableHighAccuracy: true});
			// if there is NOT a currently logged in user...
		} else {
			alert('You must sign in before tracking location.');
			console.log('Cannot track user location before log in.');
		}
	},

	////////////////////////////////////////////////////////////////////////
	// RENDERING VIEWS /////////////////////////////////////////////////////
	renderSplashPage: function(){
		//instantiate the SplashView
		new SplashView();
	},

	renderSignUp: function(){
		//instantiate the SignUpView
		new SignUpView();
	},

	renderLogIn: function(){
  	//instantiate the LogInView
		new LogInView();
  },

	renderUserHome: function(){
		var currentUser = Parse.User.current();

		if (!currentUser){
			this.redirectToSignup();
		} else {
	  	//instantiate the UserHomeView with the current user as the model
			new UserHomeView({model: Parse.User.current().attributes});
		}
  },

  renderClosestMouse: function(){
  	//instantiate the ClosestMouseView
		new ClosestMouseView();
  },

  renderSingleMouse: function(){
  	//instantiate the MousePhotoView
		new MousePhotoView();
  },

  renderMouseReward: function(){
  	//instantiate the MouseRewardView
		new MouseRewardView();
  },

  renderMouseGallery: function(){
  	//instantiate the MouseGalleryView
		new MouseGalleryView();
  },

  renderAllRewards: function(){
  	//instantiate the AllRewardsView
		new AllRewardsView();
  },

	renderUserSettings: function(){
		var currentUser = Parse.User.current();

		if (!currentUser){
			this.redirectToSignup();
		} else {
	  	//instantiate the UserSettingsView
			new UserSettingsView();
		}
  },

  renderMiceHistory: function(){
		//instantiate the MouseHistoryView
		new MouseHistoryView();
  },

	renderCongrats: function(){
		//instantiate the CongratulationsView
		new CongratulationsView();
  },

	renderLogOut: function(){
  	//instantiate the LogOutView
		new LogOutView();
  }

});

//instantiate the router
var router = new AppRouter;
Parse.history.start();



// CLEARING THE CURRENT USER & LOGGING OUT ///////////////////////////////
// $('.logout-btn').click(function() {
// 	//calls the logout function
// 	Parse.User.logOut();
// 	//current user is now null
// });