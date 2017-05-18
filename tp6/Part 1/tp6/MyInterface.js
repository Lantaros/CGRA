/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	this.gui = new dat.GUI();

	this.gui.add(this.scene, 'clockHandler').name('Clock');
	
	var lights=this.gui.addFolder("Luzes");
	lights.open();

	lights.add(this.scene, 'light1').name('Light 1');
	lights.add(this.scene, 'light2').name('Light 2');
	lights.add(this.scene, 'light3').name('Light 3');
	lights.add(this.scene, 'light4').name('Light 4');


	this.gui.add(this.scene, 'currSubmarineAppearance', { "Texture1":0, "Texture2":1, "Texture3":2 } ).name("Textures");
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);

	switch (event.keyCode || event.which)
	{
		case (97):{ //'a'
			this.scene.subLeft();
			break;
		}
		case(100):{//'d'
			this.scene.subRight();
			break;			
		}
		case(119):{//'w'
			this.scene.subForw();
			break;
		}
		case(115):{//'s'
			this.scene.subBack();			
			break;
		}
		case(113):{//'q'
			this.scene.subUp();
			break;
		}
		case(101):{//'e'
			this.scene.subDown();
			break;
		}
		case(112):{//'p'
			this.scene.periUp();
			break;
		}
		case(108):{//'l'
			this.scene.periDown();
			break;
		}
	};
};

MyInterface.prototype.processKeyUp = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this, event);

	switch (event.keyCode || event.which)
	{
		case (97): //'a'
		case (65):{
			this.scene.rotFinRight = false;
			this.scene.rotFinLeft = false;
			break;
		}
		case (100)://'d'
		case (68):{
			this.scene.rotFinLeft = false;
			this.scene.rotFinRight = false;
			break;			
		}
		case(113)://'q'
		case(81):{
			this.scene.rotFinDown = false;
			this.scene.submarine.angleUpDownDelta = 0;
			break;
		}
		case(101)://'e'
		case(69):{
			this.scene.rotFinUp = false;
			this.scene.submarine.angleUpDownDelta = 0;
			break;
		}
		
	};
};
MyInterface.prototype.processKeyDown = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
		switch (event.keyCode || event.which)
	{
		case (97)://'a'
		case (65):{ 
			this.scene.rotFinRight = false;
			this.scene.rotFinLeft = true;
			break;
		}
		case (100): //'d'
		case (68):{
			this.scene.rotFinRight = true;
			this.scene.rotFinLeft = false;			
			break;			
		}
		case(113)://'q'
		case(81):{
			this.scene.rotFinUp = false;
			this.scene.rotFinDown = true;
			break;
		}
		case(101)://'e'
		case(69):{
			this.scene.rotFinUp = true;
			this.scene.rotFinDown = false;
			break;
		}
		
	};
};