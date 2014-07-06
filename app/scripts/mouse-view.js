/* global Parse, _ */
'use strict';

mice.fetch().done(function(){
	console.log('closestMouse is', closestMouse);
});

//defining closestMouse so that it can be used in the user-home-template
var closestMouse = mice.last();

// CLOSEST MOUSE VIEW ////////////////////////////////////////////////////
var MouseView = Parse.View.extend({
	mouseTemplate: _.template($('.mouse-view-template').text()),

	events: {
		//'click .upload-mouse-photo-btn'	: 'uploadMousePhoto',
	},

	initialize: function(){
		//appends mouse-view div with contents of the user-home-template
		$('.mouse-view').append(this.el);

		//calls the render function
		this.render();
	},

	render: function(){
		this.$el.html(this.mouseTemplate());
		return this;
	},

	uploadMousePhoto: function(){
		//do things
	}

});

console.log('mouse file loaded');
