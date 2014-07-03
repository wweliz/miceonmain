/* global Parse, _, currentUser */
'use strict';

// USER HOME VIEW ///////////////////////////////////////////////////////////
var UserHomeView = Parse.View.extend({

	homeTemplate: _.template($('.user-home-template').text()),

	events: {
		//'click .abutton'	: 'afunction',
	},

	initialize: function(){
		//appends home-view div with contents of the user-home-template
		$('.home-view').append(this.el);

		//calls the render function
		this.render();
	},

	render: function(){
		this.$el.html(this.homeTemplate);
		return this;
	}

});