/* global Parse, _*/
'use strict';

//initializing Parse
	//1st arg: App ID; 2nd arg: JavaScript key
Parse.initialize('VAcV8xNG0NX9Px18WaMwBdxsGyH7CaCk6990BJPn', '2r1eNgxSHNsw77uJdMUUG1ATTzAOgiTYYtImdoXQ');

	//Reminder: when you add somthing to a Parse collection,
	//an instance of that Parse object is automatically created

// MOUSE MODEL ///////////////////////////////////////////////////////////
var Mouse = Parse.Object.extend({
	className: 'Mouse'
});

// MOUSE COLLECTION //////////////////////////////////////////////////////
var MouseCollection = Parse.Collection.extend({
	model: Mouse
});

var mice = new MouseCollection();

// FETCHING THE MICE COLLECTION //////////////////////////////////////////
//fetches the mice collection
// mice.fetch({
// 	success: function(collection){
// 		console.log('The mice collection was successfully fetched.');
// 	},
// 	error: function(collection, error){
// 		console.log('The mice collection could not be retrieved.');
// 	}
// });

// PHOTO MODEL ///////////////////////////////////////////////////////////
var Photo = Parse.Object.extend({
	className: 'Photo'
});

// PHOTO COLLECTION //////////////////////////////////////////////////////
var PhotoCollection = Parse.Collection.extend({
	model: Photo
});

// var photos = new PhotoCollection();

// USER MODEL ////////////////////////////////////////////////////////////
var User = Parse.Object.extend({
	className: 'User'
});

// USER COLLECTION ///////////////////////////////////////////////////////
var UserCollection = Parse.Collection.extend({
	model: User
});

// var users = new UserCollection();

//////////////////////////////////////////////////////////////////////////
// RELATIONAL DATA ///////////////////////////////////////////////////////

// USER-TO RELATIONS /////////////////////////////////////////////////////
var currentUser = Parse.User.current();

var userMouseRelation = currentUser.relation("miceFound");
userMouseRelation.add(Mouse);

var userPhotoRelation = currentUser.relation("photosUploaded");
userPhotoRelation.add(Photo);

//currentUser.save();

// MOUSE-TO RELATIONS ////////////////////////////////////////////////////
var photo = new Photo();

var mousePhotoRelation = photo.relation("photosUploaded");
mousePhotoRelation.add(Photo);

//photo.save();