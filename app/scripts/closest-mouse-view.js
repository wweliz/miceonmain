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
			$('#takePictureField').on('change',this.gotPic);
		});
	},

	render: function(){
		this.$el.html(this.mouseTemplate());
		return this;
	},

	gotPic: function(event){
		if(event.target.files.length == 1 && 
			event.target.files[0].type.indexOf('image/') == 0) {
				$('#yourimage').attr('src',URL.createObjectURL(event.target.files[0]));
			}
	},

	uploadMousePhoto: function(){
		var fileUploadControl = $('#takePictureField')[0];
		
		if (fileUploadControl.files.length > 0) {
			var file = fileUploadControl.files[0];
			var name = 'photo.jpg';
			var parseFile = new Parse.File(name, file);
		}

		//saves the uploaded image as a ParseFile to Parse
		parseFile.save().done(function() {
  		//creates a new photo instance using the parseFile
  		var uploadedPhoto = new Photo();
  			//sets the properties of that instance
				uploadedPhoto.set('imgFile', parseFile);
			
			//saves the uploaded image as a Parse.Object to Parse
				//the Photo constructor is an extension of Parse.Object
			uploadedPhoto.save().done(function() {
				//creates a relation between the current user and photosUploaded
				//adds the photo just uploaded byt the current user to the relation
				Parse.User.current().relation('photosUploaded').add(uploadedPhoto);
				//saves the current user
				Parse.User.current().save();
			});

		}, function(error) {
  		console.log('The file either could not be read, or could not be saved to Parse.');
		});
	}

});