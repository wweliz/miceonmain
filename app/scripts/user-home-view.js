/* global Parse, _ */
'use strict';

// USER HOME VIEW ////////////////////////////////////////////////////////
var UserHomeView = Parse.View.extend({
	homeTemplate: _.template($('.user-home-template').text()),

	events: {
		//'click .abutton'	: 'afunction',
	},

	initialize: function(){
		//appends home-view div with contents of the user-home-template
		$('.home-view').append(this.el);
	},

	render: function(){
		this.$el.html(this.homeTemplate());
		return this;
	}

});