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
		$('.signup-view').html(this.el);
		//render called inside of swap function
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
		var user = new Parse.User()
		user.set({
			"username":		usernameVal,
			"email":			emailVal,
			"password":		passwordVal,
			"hometown": 	hometownVal
		})

		//saves added input to the server; when done...
		user.signUp(null, {
			success: function(user) {
    	// Hooray! Let them use the app now.
    		router.navigate('/userview', {trigger: true})
  		},
  		error: function(user, error) {
    	// Show the error message somewhere and let the user try again.
    	alert("Error: " + error.code + " " + error.message);
  		}
		});
	}

});