/* global Parse, _ */
'use strict';

// ALL REWARDS VIEW //////////////////////////////////////////////////////
var AllRewardsView = Parse.View.extend({
	
	allrewardsTemplate: _.template($('.all-rewards-template').text()),

	initialize: function(){
		//appends all-rewards-view div with contents of the all-rewards-template
		$('.all-rewards-view').append(this.el);
		//render called inside of swap function
	},

	render: function(){
		this.$el.html(this.allrewardsTemplate());
		return this;
	}

});