/* global Parse, _ */
'use strict';

// ALL REWARDS VIEW //////////////////////////////////////////////////////
var AllRewardsView = Parse.View.extend({
	allrewardsTemplate: _.template($('.all-rewards-template').text()),

	events: {
		'click .back-to-search-btn'	: 'showUserHomeView',
	},

	initialize: function(){
		//appends all-rewards-view div with contents of the all-rewards-template
		$('.all-rewards-view').append(this.el);
		//render called inside of swap function
	},

	render: function(){
		this.$el.html(this.allrewardsTemplate());
		return this;
	},

	showUserHomeView: function(){
		//clicking back to the search button with anchor tag redirects to the UserHomeView
  }

});