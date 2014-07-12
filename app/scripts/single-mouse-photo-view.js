/* global Parse, _ */
'use strict';

// SINGLE MOUSE PHOTO VIEW ////////////////////////////////////////////////////
var MousePhotoView = Parse.View.extend({
	photoTemplate: _.template($('.photo-template').text()),

	events: {
		'click .mouse-photo-gallery-btn' : 'showMousePhotoGallery',
	},

	initialize: function(){
		//appends single-photo-view div with contents of the photo-template
		$('.single-photo-view').append(this.el);

		//calls the render function
		this.render();
	},

	render: function(){
		this.$el.html(this.photoTemplate());
		return this;
	},

	showMousePhotoGallery: function(){
		//clicking the View Photo Gallery button with anchor tag redirects to the MouseGalleryView
	},

});