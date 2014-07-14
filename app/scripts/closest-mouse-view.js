/* global Parse, _ */
'use strict';

// CLOSEST MOUSE VIEW ////////////////////////////////////////////////////
var ClosestMouseView = Parse.View.extend({

	mouseTemplate: _.template($('.mouse-view-template').text()),

	events: {
		'click .upload-mouse-photo-btn'	: 'uploadMousePhoto',
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
		var fileUploadControl = $("#takePictureField")[0];
		if (fileUploadControl.files.length > 0) {
			var file = fileUploadControl.files[0];
			var name = "photo.jpg";
			var parseFile = new Parse.File(name, file);
		}

		parseFile.save().then(function() {
  		console.log('The file has been saved to Parse.');

  		var uploadedPhoto = new Parse.Object('Photo');
			uploadedPhoto.set('imgFile', parseFile);
			uploadedPhoto.save().done(function() {
				console.log('The uploaded file has been saved to Parse.');
			});

		}, function(error) {
  		console.log('The file either could not be read, or could not be saved to Parse.');
		});
	},

	gotPic: function(event){
		if(event.target.files.length == 1 && 
			event.target.files[0].type.indexOf("image/") == 0) {
				$("#yourimage").attr("src",URL.createObjectURL(event.target.files[0]));
			}
	}

});