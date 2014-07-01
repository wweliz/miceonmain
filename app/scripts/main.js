/* global Parse, _ */
'use strict';

// INITITAL CHECKING FOR CURRENT USER ////////////////////////////////////
var currentUser = Parse.User.current();
if (currentUser) {
  	//instantiate the initial SplashView
  	new UserHomeView();
} else {
  	//instantiate the SplashView
		new SplashView();
}



//instantiate a new UserSettingsView when the settings button is clicked
//var currentUser = Parse.User.current();
//new UserSettingsView({model: currentUser });





// CLEARING THE CURRENT USER & LOGGING OUT ///////////////////////////////
$('.logout-btn').click(function() {
	//calls the logout function
	Parse.User.logOut();
	//current user is now null
});