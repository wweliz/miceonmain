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
		'usersettings'		: 'renderUserSettings',			//	url/#usersettings
		'logout'					: 'renderLogOut'						//	url/#logout
	},

	initialize: function(){
		// if there is a currently logged in user...
		if (currentUser) {
				window.location = '/#userview';
			//redirect to the UserHomeView
		// if there is NOT a currently logged in user...
		} else {
			//redirect to the SplashView
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
		this.loginview = new LogInView();
  },

	renderUserHome: function(){
		if (!currentUser){
			this.redirectToSignup();
		} else {
	  	//instantiate the UserHomeView	
			new UserHomeView({model: Parse.User.current().attributes});
		}

  },

	renderUserSettings: function(){
		if (!currentUser){
			this.redirectToSignup();
		} else {
	  	//instantiate the UserSettingsView
	  	// this.loginview.remove();
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