/* global Parse, _ */
'use strict';

// LOG IN VIEW ///////////////////////////////////////////////////////////
var SplashView = Parse.View.extend({

	splashTemplate: _.template($('.splash-template').text()),

	// EVENTS:
	// clicking sign up button with anchor tag redirects to the SignUpView
	// clicking log in button with anchor tag redirects to the LogInView

	initialize: function(){
		//appends splash-view div with contents of the splash-template
		$('.splash-view').append(this.el);
		//render called inside of swap function
	},

	render: function(){
		this.$el.html(this.splashTemplate);
		return this;
	}

});