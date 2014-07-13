//////////////////////////////////////////////////////////////////////////
// THE HOME BUTTON ///////////////////////////////////////////////////////
$('.home-btn').click(function() {
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
	Parse.User.logOut();
	//current user is now null

	//router redirects to the SplashView
	router.navigate('', {trigger: true});
});

//////////////////////////////////////////////////////////////////////////
// THE USER SETTINGS BUTTON //////////////////////////////////////////////
$('.settings-btn').click(function() {
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
	router.navigate('micehistory', {trigger: true});
});