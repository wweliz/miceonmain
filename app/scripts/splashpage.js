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

	//SplashView has no models or collections and doesn't have a "listen",
	//so you can remove the view rather than destroying it 

	showSignUpView: function(){
		//removes the SplashView from the DOM
		this.remove();
		//creates a new SignUpView
		new SignUpView();
	},

	showLogInView: function(){
		//removes the SplashView from the DOM
		this.remove();
		//creates a new LogInView
		new LogInView();
	}

});