/*
__/\\\\\\\\\\\__/\\\\\\\\\\\________/\\\\\\\\\____________/\\\\\\\\\\\\\_____________________________________________        
 _\/////\\\///__\/////\\\///______/\\\////////____________\/\\\/////////\\\______________________________/\\\_________       
  _____\/\\\_________\/\\\_______/\\\/_____________________\/\\\_______\/\\\_____________________________\/\\\_________      
   _____\/\\\_________\/\\\______/\\\_______________________\/\\\\\\\\\\\\\/___/\\\____/\\\_____/\\\\\\\\_\/\\\\\\\\____     
    _____\/\\\_________\/\\\_____\/\\\_______________________\/\\\/////////____\/\\\___\/\\\___/\\\//////__\/\\\////\\\__    
     _____\/\\\_________\/\\\_____\//\\\______________________\/\\\_____________\/\\\___\/\\\__/\\\_________\/\\\\\\\\/___   
      _____\/\\\_________\/\\\______\///\\\____________________\/\\\_____________\/\\\___\/\\\_\//\\\________\/\\\///\\\___  
       __/\\\\\\\\\\\__/\\\\\\\\\\\____\////\\\\\\\\\___________\/\\\_____________\//\\\\\\\\\___\///\\\\\\\\_\/\\\_\///\\\_ 
        _\///////////__\///////////________\/////////____________\///_______________\/////////______\////////__\///____\///__
*/
// A script for IsItChristmas.com by EliTheCoder
// Open developer console and paste the following code. Then, press enter to run.
// Enjoy!
// Feel free to change these:
//      V V V V V V V

var refreshRate = 100; // 100 - Updates position every 100 milliseconds
var startingX = 100; // 100 - Flag starts at X value 100
var startingY = 100; // 100 - Flag starts at Y value 100

// Don't change any of this unless you know what you're doing
//         V V V V V V V V V V V V V V V V V V V V V v

// ID of the player
var id = IIC.getId();

// Index of the player's ID in all the IDs
var idind;

// Defining the x and y values as the set ones above
var x = startingX;
var y = startingY;

// Defining the velocity (speed and direction)
// The flag isn't moving anywhere yet so they're both set to nothing
// Although, if the speed is 0, the direction could be anything, but I pick 0 because it means 'nothing'
var velocity = {
	speed: 0,
	direction: 0
};

// Defining a few variables used in the update function
var cids = [];
var allxs = [];
var allys = [];

// Function that gets updated at the refreshRate
function update() {
	// Put the IDs of all the connected players in a variable
	cids = IIC.getConnectedIds();

	// Put the index of the player's ID in all the IDs in a variable
	idind = cids.indexOf(id);

	// And removing the player's own ID
	cids.splice(idind, 1);

	// Constantly updating the variables full of all the player's coords
	allxs = [];
	IIC.getConnectedIds().forEach(sid => {
		allxs.push(IIC.getPosition(sid).x);
		allys.push(IIC.getPosition(sid).y);
	});

	// Constantly updating the player's x and y based on the direction they're moving
	x += velocity.speed * Math.cos(velocity.direction);
	y += velocity.speed * Math.sin(velocity.direction);

	// Constantly updating the player's coords w/ the x and y variables
	IIC.setPosition(x, y);
}

setInterval(update, refreshRate);
