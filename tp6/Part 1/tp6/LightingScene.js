var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;

var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();	

	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
	
	this.floor = new MyQuad(this, 0,2, 0, 2);
	this.post = new MyCylinder(this,40,2);
	this.clock = new MyClock(this);

	this.submarine = new MySubmarine(this);
	
	//this.boardA = new Plane(this, BOARD_A_DIVISIONS);
	//this.boardB = new Plane(this, BOARD_B_DIVISIONS);

	// Materials
	this.materialDefault = new CGFappearance(this);

	
	this.materialTable = new CGFappearance(this);
	this.materialTable.setSpecular(0.1,0.1,0.1,0);
	this.materialTable.setAmbient(175,79,5,0);
	this.materialTable.setDiffuse(2,1,0.1,0);


	//Textures
	this.enableTextures(true);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.loadTexture("../resources/images/oceanFloor512.png");
	this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.displayAppearance = new CGFappearance(this);
	this.displayAppearance.loadTexture("../resources/images/clock.png");
	this.displayAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	
    this.white =  new CGFappearance(this);

    //for submarine
    this.light1=true; 
    this.light2=true; 
    this.light3=true;
    this.light4=true;
    this.speed=3;

    this.submarineAppearances = new Array();    
    this.submarineAppearanceList = {};
    this.currSubmarineAppearance = 0;

    this.submarineAppearanceList[0] = "Texture1";

  //  this.submarineAppearances.push(displayAppearance);

    this.valid = true;
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	this.setGlobalAmbientLight(0,0,0, 1.0);

	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)		
	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setSpecular(1,1,1,1);
	this.lights[2].setConstantAttenuation(0) //Kc = 0
	this.lights[2].setLinearAttenuation(1) //Ki = 1
	this.lights[2].setQuadraticAttenuation(0) //Kq = 0
	this.lights[2].setVisible(true); 

	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true);
	this.lights[3].setConstantAttenuation(0) //Kc = 0
	this.lights[3].setLinearAttenuation(0) //Ki = 0
	this.lights[3].setQuadraticAttenuation(0.2) //Kq = 0.2


};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)	
			this.lights[i].update();

	if (this.light1)
		this.lights[0].enable();
	else
		this.lights[0].disable();
		
	if (!this.light1)
		this.lights[0].disable();
	else
		this.lights[0].enable();

	if (this.light2)
		this.lights[1].enable();
	else
		this.lights[1].disable();

	if (!this.light2)
		this.lights[1].disable();
	else
		this.lights[1].enable();
	
	if (this.light3)
		this.lights[2].enable();
	else
		this.lights[2].disable();

	if (!this.light3)
		this.lights[2].disable();
	else
		this.lights[2].enable();
			
	if (this.light4)
		this.lights[3].enable();
	else
		this.lights[3].disable();
		
	if (!this.light4)
		this.lights[3].disable();
	else
		this.lights[3].enable();			
};



LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup
	
    this.gl.clearColor(16/255, 6/255, 159/255,1);

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();
	
	// Draw axis
	this.axis.display();

	this.materialDefault.apply();


	// ---- END Background, camera and axis setup

	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();			
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	
	
/*	// Left Wall
	this.pushMatrix();
	this.translate(0, 4, 7.5);
	this.rotate(90 * degToRad, 0, 1, 0);
	this.scale(15, 8, 0.2);
		this.windowAppearance.apply();

	this.wall.display();	
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.white.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
			this.translate(5, 0, 8);
		
		//this.materialTable.apply();
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();*/

	// Post
	this.pushMatrix();
		this.translate(8,0,0.1);	
		this.scale(0.1, 4, 0.1);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.post.display();
	this.popMatrix();

	//Clock
	this.pushMatrix();
		this.translate(8, 5, 0);
		this.clock.display();
	this.popMatrix();

	//submarine
	this.pushMatrix();
		this.translate(8.1, 4, 7);
	//	this.submarineAppearances[currSubmarineAppearance].apply();
		this.submarine.display();
	this.popMatrix();

	// ---- END Primitive drawing section

	this.setUpdatePeriod(100); //100 ms Period
};

LightingScene.prototype.update = function(currTime, valid) {
	if (this.valid)
		this.clock.update(currTime);
};

//for submarine
LightingScene.prototype.doSomething = function (){
	console.log("Doing something...");
};
LightingScene.prototype.clockHandler = function (){ 	
	if (this.valid)
		this.valid = false;
	else
		this.valid = true; 
};

//for submarine
LightingScene.prototype.subLeft = function (){
	this.pushMatrix();
		this.submarine.goLeft();
		this.submarine.display();
	this.popMatrix();
};

LightingScene.prototype.subRight = function (){
	this.pushMatrix();
		this.submarine.goRight();
		this.submarine.display();
	this.popMatrix();
};

LightingScene.prototype.subForw = function (){
	this.pushMatrix();
		this.submarine.goForw();
		this.submarine.display();
	this.popMatrix();
};

LightingScene.prototype.subBack = function (){
	this.pushMatrix();
		this.submarine.goBack();
		this.submarine.display();
	this.popMatrix();
};


LightingScene.prototype.updateTexs = function(){
};

