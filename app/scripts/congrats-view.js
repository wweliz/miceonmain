/* global Parse, _ */
'use strict';

// CONGRATULATIONS VIEW //////////////////////////////////////////////////
var CongratulationsView = Parse.View.extend({
	
	congratsTemplate: _.template($('.congrats-template').text()),

	initialize: function(){
		//appends congrats-view div with contents of the congrats-template
		$('.congrats-view').append(this.el);
		//render called inside of swap function
	},

	render: function(){
		this.$el.html(this.congratsTemplate());
		return this;
	}

});