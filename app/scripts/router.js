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
		'mousegallery'		: 'renderMouseGallery',			//	url/#mousegallery
		'usersettings'		: 'renderUserSettings',			//	url/#usersettings
		'logout'					: 'renderLogOut'						//	url/#logout
	},

	initialize: function(){
		var currentUser = Parse.User.current();

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

  renderMouseGallery: function(){
  	//instantiate the MouseGalleryView
		new MouseGalleryView();
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

	renderLogOut: function(){
  	//instantiate the LogOutView
		new LogOutView();
  },

  redirectToSignup: function(){
  	router.navigate('signup', {trigger: true});
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