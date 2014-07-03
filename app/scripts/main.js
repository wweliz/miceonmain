/* global Parse */
'use strict';

// INITITAL CHECKING FOR CURRENT USER ////////////////////////////////////
// var currentUser = Parse.User.current();
// // if there is a currently logged in user...
// if (currentUser) {
//   	console.log('Current user', currentUser, 'is logged in; instantiating UserHomeView...');
//   	//instantiate the UserHomeView
//   	console.log(currentUser.attributes)
//   	console.log(this.currentUser)
//   	new UserHomeView({model: currentUser.attributes});

// // if there is NOT a currently logged in user...
// } else {
//   	console.log('No current user; instantiating SplashView...');
//   	//instantiate the initial SplashView
// 		new SplashView();
// }



//instantiate a new UserSettingsView when the settings button is clicked
//var currentUser = Parse.User.current();
//new UserSettingsView({model: currentUser });


// CLEARING THE CURRENT USER & LOGGING OUT ///////////////////////////////
// $('.logout-btn').click(function() {
// 	//calls the logout function
// 	Parse.User.logOut();
// 	//current user is now null
// });