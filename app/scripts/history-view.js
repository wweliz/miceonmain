/* global Parse, _ */
'use strict';

// LOG IN VIEW ///////////////////////////////////////////////////////////
var MouseHistoryView = Parse.View.extend({
	
	historyTemplate: _.template($('.history-template').text()),

	events: {
		//'click .xx-btn' : 'functionx'
	},

	initialize: function(){
		//appends history-view div with contents of the history-template
		$('.history-view').html(this.el);
		//render called inside of swap function
	},

	render: function(){
		this.$el.html(this.historyTemplate);
		return this;
	}

});