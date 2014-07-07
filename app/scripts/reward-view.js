//<h1> <%= mouseName %> </h1>

/* global Parse, _ */
'use strict';

// MOUSE REWARD VIEW /////////////////////////////////////////////////////
var MouseRewardView = Parse.View.extend({
	rewardTemplate: _.template($('.reward-template').text()),

	events: {
		'click .show-all-rewards-btn'	: 'showAllRewardsView',
	},

	initialize: function(){
		//appends reward-view div with contents of the reward-template
		$('.reward-view').append(this.el);

		//calls the render function
		this.render();
	},

	render: function(){
		this.$el.html(this.rewardTemplate());
		return this;
	},

	showAllRewardsView: function(){
		//removes the MouseRewardView from the DOM
		this.remove();
		//clicking see all rewards button with anchor tag redirects to the AllRewardsView
	},

});