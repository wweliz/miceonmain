/* global Parse, _ */
'use strict';

// USER SETTINGS VIEW ///////////////////////////////////////////////////////////
var UserSettingsView = Parse.View.extend({

	userSettingsTemplate: _.template($('.user-settings-template').text()),

	events: {
		'click .save-settings-btn'	: 'saveChanges',
	},

	initialize: function(){
		//appends settings-view div with contents of the user-settings-template
		$('.settings-view').append(this.el);
		//render called inside of swap function
	},

	render: function(){
		this.$el.html(this.userSettingsTemplate);
		return this;
	},

	saveChanges: function(){
		//naming the value of the input fields
		var emailVal = $('.email-input').val();
		var passwordVal = $('.password-input').val();

		//sets the properties and values of the current user
		Parse.User.current().set({
				email:		emailVal,
				password:	passwordVal
		});

		//saves the current user in Parse database
		Parse.User.current().save();
	}

});