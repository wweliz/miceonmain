/* global Parse, _ */
'use strict';

//instantiates the initial SplashView
//new SplashView();

new UserSettingsView({model: User});

// SETTING THE CURRENT USER //////////////////////////////////////////////
// var currentUser = Parse.User.current();
// if (currentUser) {
//     // do stuff with the user
// } else {
//     // show the signup or login page
// }


// CLEARING THE CURRENT USER & LOGGING OUT ///////////////////////////////
$('.logout-btn').click(function() {
	//calls the logout function
	Parse.User.logOut();
	//current user is now null
	var currentUser = Parse.User.current();
});