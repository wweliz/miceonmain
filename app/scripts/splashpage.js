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

	showSignUpView: function(){
		console.log('show-signup-btn clicked');
		//new SignUpView();
	},

	showLogInView: function(){
		console.log('show-login-btn clicked');
		//new LogInView();
	}

});