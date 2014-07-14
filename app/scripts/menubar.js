/* global Parse, _ */
'use strict';

//////////////////////////////////////////////////////////////////////////
// THE HOME BUTTON ///////////////////////////////////////////////////////
$('.home-btn').click(function() {
	console.log('Home button clicked.');
	// if there is a currently logged in user...
	if ( Parse.User.current() ) {
		//router redirects to the UserHomeView
		router.navigate('userview', {trigger: true});

	// if there is NOT a currently logged in user...
	} else {
		//router redirects to the SplashView
		router.navigate('', {trigger: true});
	}
});

//////////////////////////////////////////////////////////////////////////
// THE LOG OUT BUTTON ////////////////////////////////////////////////////
$('.logout-btn').click(function() {
	console.log('Log out button clicked.');

	Parse.User.logOut();
	//router redirects to the SplashView
	router.navigate('', {trigger: true});
});

//////////////////////////////////////////////////////////////////////////
// THE USER SETTINGS BUTTON //////////////////////////////////////////////
$('.settings-btn').click(function() {
	console.log('Settings button clicked.');
	// if there is a currently logged in user...
	if ( Parse.User.current() ) {
		//router redirects to the UserHomeView
		router.navigate('usersettings', {trigger: true});

	// if there is NOT a currently logged in user...
	} else {
		//router redirects to the SplashView
		router.navigate('', {trigger: true});
	}
});

//////////////////////////////////////////////////////////////////////////
// THE PHOTO GALLERY BUTTON //////////////////////////////////////////////
$('.photo-gallery-btn').click(function() {
	console.log('Photos button clicked.');
	// if there is a currently logged in user...
	if ( Parse.User.current() ) {
		//router redirects to the UserHomeView
		router.navigate('mousegallery', {trigger: true});

	// if there is NOT a currently logged in user...
	} else {
		//router redirects to the SplashView
		router.navigate('', {trigger: true});
	}
});

//////////////////////////////////////////////////////////////////////////
// THE REWARDS GALLERY BUTTON ////////////////////////////////////////////
$('.reward-gallery-btn').click(function() {
	console.log('Rewards button clicked.');
	// if there is a currently logged in user...
	if ( Parse.User.current() ) {
		//router redirects to the UserHomeView
		router.navigate('rewardgallery', {trigger: true});

	// if there is NOT a currently logged in user...
	} else {
		//router redirects to the SplashView
		router.navigate('', {trigger: true});
	}
});

//////////////////////////////////////////////////////////////////////////
// THE NEAREST MOUSE BUTTON //////////////////////////////////////////////
$('.nearest-mouse-btn').click(function() {
	console.log('Nearest mouse button clicked.');
	// if there is a currently logged in user...
	if ( Parse.User.current() ) {
		//router redirects to the UserHomeView
		router.navigate('mouseview', {trigger: true});

	// if there is NOT a currently logged in user...
	} else {
		//router redirects to the SplashView
		router.navigate('', {trigger: true});
	}
});

//////////////////////////////////////////////////////////////////////////
// THE MOUSE HISTORY BUTTON //////////////////////////////////////////////
$('.history-btn').click(function() {
	console.log('Mouse history button clicked.');
	router.navigate('micehistory', {trigger: true});
});