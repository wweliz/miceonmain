/* global Parse, _ */
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
		//sets the properties of the user to the value of the input fields 
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
			    console.log('User logged in.');
			    //removes the SignUpView from the DOM
					/////////////////////////////////////this.remove( bind(this) );
					//creates a new SignUpView
					//new UserHomeView();
				},
			  error: function(user, error) {
			  	console.log('User not logged in.');
			    //show error message and let the user try again
					//alert('Error: Sign up failed.' + error.code + ' ' + error.message);
					//user stays on the signup page
			  }
			});
		});
	}

});