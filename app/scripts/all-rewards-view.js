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

		//calls the render function
		this.render();
	},

	render: function(){
		this.$el.html(this.allrewardsTemplate());
		return this;
	},

	showUserHomeView: function(){
		//removes the AllRewardsView from the DOM
		this.remove();
		//clicking back to the search button with anchor tag redirects to the UserHomeView
  },

});