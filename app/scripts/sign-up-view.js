/* global Parse, _ */
'use strict';

// LOG IN VIEW ///////////////////////////////////////////////////////////
var SignUpView = Parse.View.extend({

	signupTemplate: _.template($('.signup-template').text()),

	events: {
		'click .signup-btn'	: 'userSignUp',
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

	createUser: function(){
		//naming the value of the input fields
		var usernameVal = $('.username-input').val();
		var emailVal = $('.email-input').val();
		var passwordVal = $('.password-input').val();
		var hometownVal = $('.hometown-input').val();

			//adds the input values to the photo collection
	var createdUser = users.add({
				username:		usernameVal,
				email:			emailVal,
				password:		passwordVal,
				hometown: 	hometownVal
		}).last();
	//saves added input to the server
	createdUser.save();

		//creates a new user instance
		// var user = new Parse.User();
		// //sets the properties and values of the user instance
		// user.set({
		// 		username:		usernameVal,
		// 		email:			emailVal,
		// 		password:		passwordVal,
		// 		hometown: 	hometownVal
		// });

		// //saves input to the server
		// user.save();
	},

	userSignUp: function(){
		user.signUp(null, {
			success: function(user) {
				console.log('User is logged in.');
			},
			error: function(user, error) {
				console.log('User was not logged in.');
				// Show the error message somewhere and let the user try again.
				alert('Error: Sign up failed.' + error.code + ' ' + error.message);
				//redirect user back to signup page
			}
		});
	}
	
});