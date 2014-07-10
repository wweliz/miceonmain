/* global Parse, _ */
'use strict';

// <h1> <%= closestMouse.attributes.mouseName %> </h1>
// <h3> <%= closestMouse.attributes.mouseGeopoint %> </h3>
// <p> <%= closestMouse.attributes.mouseHint %> </p>

// CLOSEST MOUSE VIEW ////////////////////////////////////////////////////


var ClosestMouseView = Parse.View.extend({
	mouseTemplate: _.template($('.mouse-view-template').text()),

	events: {
		//'click .upload-mouse-photo-btn'	: 'uploadMousePhoto',
	},

	initialize: function(){
		//appends mouse-view div with contents of the user-home-template
		$('.closest-mouse-view').append(this.el);

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