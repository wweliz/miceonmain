/* global Parse, _ */
'use strict';

// CLOSEST MOUSE VIEW ////////////////////////////////////////////////////
var ClosestMouseView = Parse.View.extend({

	mouseTemplate: _.template($('.mouse-view-template').text()),

	events: {
		//'click .upload-mouse-photo-btn'	: 'uploadMousePhoto',
	},

	initialize: function(){
		//appends mouse-view div with contents of the user-home-template
		$('.closest-mouse-view').append(this.el);
		//render called inside of swap function

		$(document).ready(function(){
			$("#takePictureField").on("change",this.gotPic);
		});
	},

	render: function(){
		this.$el.html(this.mouseTemplate());
		return this;
	},

	uploadMousePhoto: function(){
		//do things
	},

	gotPic: function(event){
		if(event.target.files.length == 1 && 
			event.target.files[0].type.indexOf("image/") == 0) {
				$("#yourimage").attr("src",URL.createObjectURL(event.target.files[0]));
			}
	}

});