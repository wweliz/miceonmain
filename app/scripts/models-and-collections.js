/* global Parse, _ */

'use strict';

//initializing Parse
	//1st arg: App ID; 2nd arg: JavaScript key
Parse.initialize('VAcV8xNG0NX9Px18WaMwBdxsGyH7CaCk6990BJPn', '2r1eNgxSHNsw77uJdMUUG1ATTzAOgiTYYtImdoXQ');

	//Reminder: when you add somthing to a Parse collection,
	//an instance of that Parse object is automatically created

// MOUSE MODEL ////////////////////////////////////////////////////
var Mouse = Parse.Object.extend({
	className: 'Mouse',
	defaults: { found	: false }
});

// MOUSE COLLECTION ////////////////////////////////////////////////
var MouseCollection = Parse.Collection.extend({
	model: Mouse
});

var mice = new MouseCollection;

// PHOTO MODEL ////////////////////////////////////////////////////
var Photo = Parse.Object.extend({
	className: 'Photo',
	defaults: { caption	: '' }
});

// PHOTO COLLECTION ////////////////////////////////////////////////
var PhotoCollection = Parse.Collection.extend({
	model: Photo
});

var photos = new PhotoCollection;

// USER MODEL ////////////////////////////////////////////////////
var User = Parse.Object.extend({
	className: 'User',
});

// USER COLLECTION ////////////////////////////////////////////////
var UserCollection = Parse.Collection.extend({
	model: User
});

var users = new UserCollection;