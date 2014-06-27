/* global describe, it */
	//tells JSHint that global variables "describe" and "it" are defined in another file
 
(function(){
	'use strict';

	describe('mice on main app', function(){
		////////// MODELS AND COLLECTIONS ///////////////////////////////////////////////////////////////////////////////////////////
		it('should have a user model', function(){
		});

		it('should have a users collection', function(){
		});

		it('should have a fastest time collection', function(){
			//users ranked on how long it took them to find all the mice
		});

		it('should have a longest distance collection', function(){
			//users ranked on how far they travelled to get to Greenville
		});

		//////////////////////////////////////////////////////////////////////

		it('should have a badge/reward model', function(){
		});

		it('should have a badges/rewards collection', function(){
		});


		////////// BASIC USER FUNCTIONS /////////////////////////////////////////////////////////////////////////////////////////////
		it('should have a sign up', function(){
			//sets username
			//sets email
			//sets password
			//sets a "home" property -- ie, where the person is from
				//"home" will be used to track how far someone has traveled to get to Greenville
		});

		it('should have log in', function(){
			//authenticates username and password
			//if the user is logged in, they will have a session token
		});

		it('should have log out', function(){
			//if the user is logged out, their session token is revoked/invalid
		});

		it('should have a password reset', function(){
			//will send a password reset email to the user's email address
		});

		////////// TRACKING THE USER'S JOURNEY //////////////////////////////////////////////////////////////////////////////////////
		it('should record the time when a user logs in and out', function(){
			//will be used for the leaderboard -- fastest to find all 9 mice
		});

		it('should track the user latitude and longitude', function(){
			//will be used for the leaderboard -- fastest to find all 9 mice
		});

		it('should alert the user when he/she is within a certain distance of one the mice', function(){
			//the alert will say the name of the mouse the user is near and a clue on where to look
			//will be used for the leaderboard -- fastest to find all 9 mice
		});

		it('should alert the user when he/she is within a certain distance of a store selling mouse merchandise', function(){
			//will be used for the leaderboard -- fastest to find all 9 mice
		});

		////////// ONCE A MOUSE IS FOUND ////////////////////////////////////////////////////////////////////////////////////////////
		it('should allow the user to upload a photo', function(){
			//photo should be uploaded with geo tag data
			//will be used as verification that the user found the mouse
				//need additional verification that the mouse was "found since just walking by
				//the mouse while logged in will put the user in the correct geo range
		});

		it('should reward the user for finding a mouse and uploading an image', function(){
			//adds a badge instance to the badge collection
		});

 
	}); //closes describe function
})(); //closes parent function




•	once you find a mouse, you earn a mouse badge and are told that the next closest mouse is mouse x, which is y distance away in z direction
•	when you get within x radius of mast general store, the app notifies you that you can buy the book, t-shirt, and game (same for other stores)

•	could also redesign the mice on main website + integrate w app 


	leaderboard – start searching+finish
o	fastest time for 9,8,7…
	where did you come from?
o	Show 
	Upload a photo of the mouse to prove that you saw it
	Upload comments/name
	Build in a way to see ads – make money from the city, or at least pitch it?
