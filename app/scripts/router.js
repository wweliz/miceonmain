/* global Parse, _, currentUser */
'use strict';

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
		this.fetchMice();

		// if there is a currently logged in user...
		if (currentUser) {
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
			trackUserLocation();
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
				console.log('The mice collection was successfully fetched.');
			},
			error: function(collection, error){
				console.log('The mice collection could not be retrieved.');
			}
		});
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
		if (!currentUser){
			this.redirectToSignup();
		} else {
	  	mouseQuery.find(querySuccess, queryError);
			findNearestMouse();
			milesToNearestMouse();
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
var router = new AppRouter();
Parse.history.start();