/* global Parse, _ */
'use strict';

// MOUSE REWARD VIEW /////////////////////////////////////////////////////
var MouseRewardView = Parse.View.extend({
	
	rewardTemplate: _.template($('.reward-template').text()),

	initialize: function(){
		//appends reward-view div with contents of the reward-template
		$('.reward-view').append(this.el);
		//render called inside of swap function
	},

	render: function(){
		this.$el.html(this.rewardTemplate());
		return this;
	}

});