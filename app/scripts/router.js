/* global Parse */
'use strict';

// THE APP ROUTER ////////////////////////////////////////////////////////

var appRouter = Parse.Router.extend({
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
		var currentUser = Parse.User.current();
			// if there is a currently logged in user...
			if (currentUser) {
				this.renderUserHome();
			// if there is NOT a currently logged in user...
			} else {
			  this.renderSplashPage();
			}
	},

	renderSplashPage: function(){
		//instantiate the initial SplashView
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
  	//instantiate the UserHomeView
		new UserHomeView({model: currentUser.attributes});
  },

	renderUserSettings: function(){
  	//instantiate the UserSettingsView
		new UserSettingsView();
  },

	renderLogOut: function(){
  	//instantiate the LogOutView
		new LogOutView();
  }

});


//Parse.history.start();