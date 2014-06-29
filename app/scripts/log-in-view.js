/* global Parse, _ */
'use strict';

// LOG IN VIEW ///////////////////////////////////////////////////////////
var LogInView = Parse.View.extend({
	className : 'login',

	loginTemplate: _.template($('.login-template').text()),

	events: {
		'click .login-btn'	: 'userLogIn',
	},

	initialize: function(){
		//appends login-view div with contents of the login-template
		$('.login-view').append(this.el);

		//calls the render function
		//this.render();
	},

	render: function(){
		var renderedTemplate = this.loginTemplate(this.model.attributes);
		this.$el.html(renderedTemplate);
		return this;
	},

	userLogIn: function(){
		//naming the value of the input fields
		var usernameVal = $('.username-input').val();
		var passwordVal = $('.password-input').val();

		Parse.User.logIn(usernameVal, passwordVal, {
		  success: function(user) {
		    // Do stuff after successful login.
		  },
		  error: function(user, error) {
		    // The login failed. Check error to see why.
		  }
		});
	}
	
});