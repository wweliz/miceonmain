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

		//calls the render function
		this.render();
	},

	render: function(){
		this.$el.html(this.historyTemplate);
		return this;
	}

});