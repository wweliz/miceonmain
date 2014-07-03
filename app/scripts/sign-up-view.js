/* global Parse, _, currentUser */
'use strict';

// LOG IN VIEW ///////////////////////////////////////////////////////////
var SignUpView = Parse.View.extend({
	signupTemplate: _.template($('.signup-template').text()),

	events: {
		'click .signup-btn' : 'userSignUp'
	},

	initialize: function(){
		//appends signup-view div with contents of the signup-template
		$('.signup-view').append(this.el);

		//calls the render function
		this.render();
	},

	render: function(){
		this.$el.html(this.signupTemplate);
		return this;
	},

	userSignUp: function(){
		//naming the value of the input fields
		var usernameVal = $('.username-input').val();
		var emailVal = $('.email-input').val();
		var passwordVal = $('.password-input').val();
		var hometownVal = $('.hometown-input').val();

		//creates a user instance; adds that instance to the users collection
		//sets the properties of that user to be the value of the input fields
		var user = users.add({
				username:		usernameVal,
				email:			emailVal,
				password:		passwordVal,
				hometown: 	hometownVal
		}).last();

		//saves added input to the server; when done...
		user.save().done(function(){
			//calls Parse's login function
			Parse.User.logIn(usernameVal, passwordVal, {
			  success: function(user) {
			  	var userSessionToken = Parse.User.current()._sessionToken;
					console.log('Username', user.get('username'), 'is logged in with session token', userSessionToken);
			    
			    //removes the SignUpView from the DOM
					this.remove();
					//router will redirect to the UserHomeView
				},

			  error: function(user, error) {
			  	alert('Error: Sign up failed.');
			  	console.log('User not logged in.');
					//user stays on the signup page
			  }
			});
		});
	}

});