/* global Parse, _, currentUser */
'use strict';

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
			console.log('This device supports geolocation.');
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
		this.swap( new SplashView() );
	},

	renderSignUp: function(){
		this.swap( new SignUpView() );
	},

	renderLogIn: function(){
		this.swap( new LogInView() );
  },

	renderUserHome: function(){
		if ( Parse.User.current() == null ){
			this.redirectToSignup();
		} else {
	  	//instantiate the UserHomeView with the current user as the model
	  	this.swap( new UserHomeView({model: Parse.User.current().attributes}) );
		}
  },

  renderClosestMouse: function(){
		if ( Parse.User.current() == null ){
			this.redirectToSignup();
		} else {
			this.swap( new ClosestMouseView() );
		}
  },

  renderSingleMouse: function(){
  	if ( Parse.User.current() == null ){
			this.redirectToSignup();
		} else {
			this.swap( new MousePhotoView() );
		}
  },

  renderMouseReward: function(){
  	if ( Parse.User.current() == null ){
			this.redirectToSignup();
		} else {
			this.swap( new MouseRewardView() );
		}
  },

  renderMouseGallery: function(){
  	if ( Parse.User.current() == null ){
			this.redirectToSignup();
		} else {
			this.swap( new MouseGalleryView() );
		}
  },

  renderAllRewards: function(){
  	if ( Parse.User.current() == null ){
			this.redirectToSignup();
		} else {
			this.swap( new AllRewardsView() );
		}
  },

	renderUserSettings: function(){
		if ( Parse.User.current() == null ){
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