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

		//calls the render function
		this.render();
	},

	render: function(){
		this.$el.html(this.userSettingsTemplate);
		return this;
	},

	saveChanges: function(){
		//naming the value of the input fields
		var emailVal = $('.email-input').val();
		var passwordVal = $('.password-input').val();

		var currentUser = Parse.User.current();
			currentUser.set({
					email:		emailVal,
					password:	passwordVal
			});

		currentUser.save();
	}

});