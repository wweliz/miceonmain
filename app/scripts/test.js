/* global describe, it */
	//tells JSHint that global variables "describe" and "it" are defined in another file

'use strict';

////////// THE USER MODEL & COLLECTIONS ///////////////////////////////////////////////////////////
(function(){
	describe('the user model and users collection', function(){
		
		////////// THE USER MODEL ////////////////////////////////////////////
		it('should have a user model', function(){
			//username
			//email
			//password
			//"homecity" property -- ie, where the person is from
		});

		////////// THE USER'S COLLECTIONS ////////////////////////////////////
		it('should have a users collection', function(){
		});

		it('should have a fastest time collection', function(){
			//users ranked on how long it took them to find all the mice
		});

		it('should have a longest distance travelled collection', function(){
			//users ranked on how far they travelled to get to Greenville
		});

		it('should have a user photos collection', function(){
			//users ranked on how far they travelled to get to Greenville
		});

		it('should have a user rewards collection', function(){
			//will show which mice a user has found
		});

	}); //closes describe function
})(); //closes parent function

////////// BASIC USER FUNCTIONS ///////////////////////////////////////////////////////////////////
(function(){
	describe('the user account', function(){
		
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

	});
})();

////////// TRACKING THE USER'S JOURNEY ////////////////////////////////////////////////////////////
(function(){
	describe('the user journey', function(){
		
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

	});
})();

////////// THE PHOTO MODEL & COLLECTIONS ///////////////////////////////////////////////////////////
(function(){
	describe('the photo model and photos collection', function(){
		
		////////// THE PHOTO MODEL ///////////////////////////////////////////
		it('should have a photo model', function(){
			//username of who uploaded the photo
			//image URL
			//image caption
			//latitude and longitude coordinates when you capture the image
		});

		////////// PHOTO COLLECTIONS /////////////////////////////////////////
		it('should have a collection of photos for each mouse', function(){
		});		

		it('should have a collection of all photos uploaded', function(){
		});

	});
})();

////////// THE MOUSE-LOCATION MODEL & COLLECTIONS /////////////////////////////////////////////////
(function(){
	describe('the mouse-location model and photos collection', function(){
		
		////////// THE MOUSE-LOCATION MODEL //////////////////////////////////
		it('should have a mouse-location model', function(){
			//mouse name
			//mouse "story" -- small amount of text about that particular mouse
			//hint on where (specifically) to look for the mouse
			//latitude and longitude coordinates of the mouse sculpture
		});

		////////// THE MOUSE-LOCATION COLLECTION /////////////////////////////
		it('should have a collection of all mice sculptures', function(){
			//there will be 9 mice sculptures in the collection
		});

	});
})();

////////// THE REWARD MODEL & COLLECTIONS /////////////////////////////////////////////////////////
(function(){
	describe('the reward model and photos collection', function(){
		
		////////// THE REWARD MODEL //////////////////////////////////////////
		it('should have a reward model', function(){
			//mouse name
			//displays a little piece of cheese
		});

		////////// THE REWARD COLLECTION /////////////////////////////////////
		it('should have a collection of the rewards available', function(){
			//you can earn a total of 9 rewards
		});

		it('should have a collection of all rewards earned', function(){
		});

	});
})();

////////// ONCE A MOUSE IS FOUND //////////////////////////////////////////////////////////////////
(function(){
	describe('mice on main app', function(){

		it('should allow the user to upload a photo', function(){
			//photo should be uploaded with latitude and longitude coordinates of the mouse sculpture
				//will be used as additional verification that the user found the mouse --
				//just walking by a geopoint while logged in will put the user in the correct geo range
		});

		it('should reward the user for finding a mouse and uploading an image', function(){
			//adds a reward instance to the user reward collection
		});

		it('should point the user in the direction of the next closest mouse', function(){
			//because the mice are arranged in a more or less linear path, there should be two
			//possible "closest" mice -- in the direction of either North Main or West End
		});
	});
})();