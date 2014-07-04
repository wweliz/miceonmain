/* global Parse, _ */
'use strict';

// LOG IN VIEW ///////////////////////////////////////////////////////////
var LogInView = Parse.View.extend({
	
	loginTemplate: _.template($('.login-template').text()),

	events: {
		'click .login-btn'	: 'userLogIn',
	},

	initialize: function(){
		//appends login-view div with contents of the login-template
		$('.login-view').append(this.el);

		//calls the render function
		this.render();
	},

	render: function(){
		this.$el.html(this.loginTemplate);
		return this;
	},

	userLogIn: function(){
		//naming the value of the input fields
		var usernameVal = $('.username-input').val();
		var passwordVal = $('.password-input').val();

		//sets 'that' to refer to the view so that the view can be removed
		var that = this;
		
		//calls Parse's login function
		Parse.User.logIn(usernameVal, passwordVal, {
		  success: function(user) {
		  	//defines the current user and that user's session token
		  	window.currentUser = Parse.User.current();
		  	var userSessionToken = Parse.User.current()._sessionToken;
				console.log('Username', user.get('username'), 'is logged in with session token ', userSessionToken);

				//router redirects to the UserHomeView
				router.navigate('userview', {trigger: true});

				//removes the LogInView from the DOM
				that.remove();
			},

		  error: function(user, error) {
		  	alert('Error: Sign up failed.');
		  	console.log('User not logged in.');
				//user stays on the login page
		  }
		});
	}

});