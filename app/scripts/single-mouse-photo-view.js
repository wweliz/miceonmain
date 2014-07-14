/* global Parse, _ */
'use strict';

// SINGLE MOUSE PHOTO VIEW ////////////////////////////////////////////////////
var MousePhotoView = Parse.View.extend({
	
	photoTemplate: _.template($('.photo-template').text()),

	initialize: function(){
		//appends single-photo-view div with contents of the photo-template
		$('.single-photo-view').append(this.el);
		//render called inside of swap function
	},

	render: function(){
		this.$el.html(this.photoTemplate());
		return this;
	}

});