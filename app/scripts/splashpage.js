/* global Parse, _ */
'use strict';

// LOG IN VIEW ///////////////////////////////////////////////////////////
var SplashView = Parse.View.extend({

	splashTemplate: _.template($('.splash-template').text()),

	events: {
		'click .show-signup-btn': 'showSignUpView',
		'click .show-login-btn'	: 'showLogInView',
	},

	initialize: function(){
		//appends splash-view div with contents of the splash-template
		$('.splash-view').append(this.el);
		//calls the render function
		this.render();
	},

	render: function(){
		this.$el.html(this.splashTemplate);
		return this;
	},

	//because SplashView has no models or collections, the view can simply
	//be removed rather than destroyed
	//removing a view from the DOM calls stopListening, which stops the
	//view from listening to any bound events

	showSignUpView: function(){
		//clicking sign up button with anchor tag redirects to the SignUpView
	},

	showLogInView: function(){
		//clicking log in button with anchor tag redirects to the LogInView
	}

});