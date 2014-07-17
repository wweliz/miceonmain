/* global Parse, _ */
'use strict';

// USER HOME VIEW ////////////////////////////////////////////////////////
var UserHomeView = Parse.View.extend({
	
	homeTemplate: _.template($('.user-home-template').text()),

	initialize: function(){
		//appends home-view div with contents of the user-home-template
		$('.home-view').html(this.el);
		//render called inside of swap function
	},

	render: function(){
		this.$el.html(this.homeTemplate());
		return this;
	}

});