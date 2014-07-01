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

		//calls Parse's login function
		Parse.User.logIn(usernameVal, passwordVal, {
		  success: function(user) {
		  	var userSessionToken = Parse.User.current()._sessionToken;
				console.log('Username', user.get('username'), 'is logged in with session token', userSessionToken);
		    
		    ////need to remove the LogInView from the DOM
				
				//creates a new UserHomeView
				//new UserHomeView();
			},

		  error: function(user, error) {
		  	alert('Error: Sign up failed.');
		  	console.log('User not logged in.');
				//user stays on the login page
		  }
		});
	}
});