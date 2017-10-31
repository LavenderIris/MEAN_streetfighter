function PlayGround(selector_ch1)
{
	//create the first character
	var ch1 = new Character(selector_ch1);
	var audio = new Audio('music/blanka-stage.mp3');
	var beam1 = new Beam()
	
	//attaches event listener to the document listening for key strokes
	this.initialize = function()
	{
		$(document).keydown(function(e) {
			if ( (e.keyCode == 39) || (e.keyCode == 37) || (e.keyCode == 40) || (e.keyCode == 65) || (e.keyCode == 38) || (e.keyCode == 68) || (e.keyCode == 83) ||  (e.keyCode == 70) ) {
				// console.log(ch1.constants[65]);
				ch1.updateAction(e.keyCode);
			}
		});
	}

	this.mainLoop = function()
	{
		
		audio.play();
		ch1.drawCharacter();
	}


}	//end of PlayGround class

function Beam(){
	var counter = 0;	
	this.ch_x=0;					//x_coordinate of the beam
	this.ch_y=140;					//y_coordinate of the beam

	var constants = {
		'BEAM_ANIMATE': 	{ 'y': 4, 'x': [0, 1] }
	}

	this.drawSprite = function(y, x)
	{
		$('#'+selector).css('background', "url('images/ken.png') "+x*(-70)+"px "+(-80*y)+"px").css('left', this.ch_x+"px")
	}

	this.drawBeam = function()
	{
		// console.log("drawing character");
		this.updateCoordinate();
		this.drawSprite(constants[this.action].y, constants[this.action].x[counter++]);
	}
}

function Character(selector)
{
	var selector = selector; //store the html id of the character

	var constants = {
		'STANDING': 	{ 'y': 1, 'x': [0, 1, 2, 3] },
		39: 	{ 'y': 3, 'x': [0, 1, 2] },  // WALK RIGHT
		37: 	{ 'y': 3, 'x': [2, 3, 4] },   //WALK LEFT  
		40: 	{ 'y': 9, 'x': [0] },  // KNEEL
		83: 	{ 'y': 6, 'x': [0, 1, 2, 3, 4] },  // KICK
		65: 	{ 'y': 2, 'x': [0, 1, 2] },  // PUNCH
		38:		{ 'y': 8, 'x': [0, 1, 2, 3, 4, 5] },  // JUMP
		68: 	{ 'y': 0, 'x': [0, 1, 2, 3] },   // BEAM
		70: 	{ 'y': 7, 'x': [0, 1, 2, 3, 4]}  // ROUNDHOUSE
	}
	var counter = 0;			//stores which sprite (in the x-direction) it should display 
	this.action = "STANDING";	//default action is for the character to stand
	this.ch_x=0;					//x_coordinate of the character
	this.ch_y=140;					//y_coordinate of the character
	//ch_x, ch_y and action could really all be private variables and I could have just done var instead of this. but to make debuggin easier, I am making them an instance variable so that it would display when you log the chracter object

	this.drawSprite = function(y, x)
	{
		$('#'+selector).css('background', "url('images/ken.png') "+x*(-70)+"px "+(-80*y)+"px").css('left', this.ch_x+"px").css('top', this.ch_y+"px");
	}

	//updates the action
	this.updateAction = function(action)
	{
		counter=0;
		this.action = action;
	}
	//updates the character's coordinates and changes the sprite's counter to simulate the character moving
	this.updateCoordinate = function()
	{
		if(counter>=constants[this.action].x.length)
		{
			counter=0;
			//if action is anything other than 'STANDING' change the action back to 'STANDING'
			this.action = 'STANDING';
		}

		if(this.action == 37)
			this.ch_x = this.ch_x-10;
		else if(this.action == 39)
			this.ch_x = this.ch_x+10;
		else if (this.action == 38){
			if (counter < 3)
				this.ch_y = this.ch_y-10;
			else 
				this.ch_y = this.ch_y+10;
		}

	}

	//draws the character on the screen
	this.drawCharacter = function()
	{
		// console.log("drawing character");
		this.updateCoordinate();
		this.drawSprite(constants[this.action].y, constants[this.action].x[counter++]);
	}
}