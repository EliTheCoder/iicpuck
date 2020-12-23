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

const refreshRate = 100; // 100 - Updates position every 100 milliseconds
const startingX = 100; // 100 - Flag starts at X value 100
const startingY = 100; // 100 - Flag starts at Y value 100

// Don't change any of this unless you know what you're doing
//         V V V V V V V V V V V V V V V V V V V V V v

// Defining the puck object
let puck = {
	id: IIC.getId(),
	x: startingX,
	y: startingY,
	vx: 0,
	vy: 0
};

// Defining a few variables used in the update function
let cids = [];
let pos = [];

// Function that gets updated at the refreshRate
function update() {
	// Put the IDs of all the connected players in a variable
	cids = IIC.getConnectedIds();

	// And removing the player's own ID
	cids.splice(cids.indexOf(puck.id), 1);

	// Constantly updating the variables full of all the player's coords
	pos = cids.map(cid => {
		return IIC.getPosition(cid);
	});

	// Constantly updating the player's x and y based on the direction they're moving
	puck.x += puck.vx;
	puck.y += puck.vy;

	// Constantly updating the player's coords w/ the x and y variables
	IIC.setPosition(puck.x, puck.y);

	// Make a wave (left click) at the new position
	IIC.makeWave(puck.x, puck.y);
}

setInterval(update, refreshRate);
