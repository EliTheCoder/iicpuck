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

const refreshRate = 50; // 100 - Updates position every 50 milliseconds
const startingX = 100; // 100 - Flag starts at X value 100
const startingY = 100; // 100 - Flag starts at Y value 100
const friction = 1.02;

// Don't change any of this unless you know what you're doing
//         V V V V V V V V V V V V V V V V V V V V V v

// Defining the puck object
let puck = {
	id: IIC.getId(),
	x: startingX,
	y: startingY,
	vx: 20,
	vy: 13
};

// Defining a few variables used in the update function
let cids = [];
let pos = [];

// Disabling rate limit
limiters.click = ratelimit(rawSend, 0);

// Function that gets updated at the refreshRate
function update() {
	// Put the IDs of all the connected players in a variable
	cids = IIC.getConnectedIds();

	// And removing the player's own ID
	cids.splice(cids.indexOf(puck.id), 1);

	// Constantly updating the variables full of all the player's coords
	pos = cids
		.map(cid => {
			return IIC.getPosition(cid);
		})
		.filter(a => a);

	// Player collisions
	pos.forEach(a => {
		if (distance(puck.x, puck.y, a.x, a.y) < 20) {
			puck.vx = puck.x - a.x;
			puck.vy = puck.y - a.y;
		}
	});

	// Constantly updating the player's x and y based on the direction they're moving
	puck.x += puck.vx;
	puck.y += puck.vy;

	// Friction
	puck.x /= friction;
	puck.y /= friction;

	// Wall collisions
	if (puck.x < 0) {
		puck.x = 0;
		puck.vx = -puck.vx;
	}
	if (puck.x > window.innerWidth) {
		puck.x = window.innerWidth;
		puck.vx = -puck.vx;
	}
	if (puck.y < 0) {
		puck.y = 0;
		puck.vy = -puck.vy;
	}
	if (puck.y > window.innerHeight) {
		puck.y = window.innerHeight;
		puck.vy = -puck.vy;
	}

	// Constantly updating the player's coords w/ the x and y variables
	IIC.setPosition(puck.x, puck.y);

	// Make a wave (left click) at the new position
	IIC.makeWave(puck.x, puck.y);
}

setInterval(update, refreshRate);

function distance(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
