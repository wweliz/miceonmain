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

		var that = this;

		//saves added input to the server; when done...
		user.save().done(function(){
			//calls Parse's login function
			Parse.User.logIn(usernameVal, passwordVal, {
			  success: function(user) {
			  	window.currentUser = Parse.User.current();
			    
					router.navigate('userview', {trigger: true});

			    //removes the SignUpView from the DOM
					that.remove();
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