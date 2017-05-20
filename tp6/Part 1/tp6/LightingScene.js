var degToRad = Math.PI / 180.0;

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
 	this.floor = new MyQuad(this, 0,2, 0, 2);
 	this.post = new MyCylinder(this,40, 2);
 	this.clock = new MyClock(this);
 	this.trap = new MyTrapezoid(this);
 	this.lamp = new MyLamp(this, 40, 10);
 	this.submarine = new MySubmarine(this);

    

	// Materials
	this.materialDefault = new CGFappearance(this);	
	this.materialTable = new CGFappearance(this);
	this.materialTable.setSpecular(0.1,0.1,0.1,0);
	this.materialTable.setAmbient(175,79,5,0);
	this.materialTable.setDiffuse(2,1,0.1,0);


	//Textures
	this.enableTextures(true);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.loadTexture("../resources/images/ocean.png");
	//this.floorAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

    this.displayAppearance = new CGFappearance(this);
	this.displayAppearance.loadTexture("../resources/images/clock.png");
	this.displayAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.postAppearance = new CGFappearance(this);
	this.postAppearance.loadTexture("../resources/images/HexagonalGrid.png");
	//this.displayAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	
	this.texture1 =  new CGFappearance(this);
	this.texture1.loadTexture("../resources/images/metal.png");
   	this.texture1.setTextureWrap('REPEAT', 'REPEAT');

   	this.texture2 = this.postAppearance;

	this.texture3 = new CGFappearance(this);
	this.texture3.loadTexture("../resources/images/WrinkledPlastic.jpg")
   
    //For submarine
    this.light1=true; 
    this.light2=true; 
    this.light3=true;
    this.light4=true;    
    this.valid = true;
    this.speed = this.submarine.speed;//??? DELETE
	this.lastTime = 5000;
    this.submarineAppearances = new Array();    
    this.currSubmarineAppearance = 0;
    this.rotFinLeft = false;
    this.rotFinRight = false;
    this.rotFinUp = false;
    this.rotFinDown = false;

	//Push all sub textures to submarineAppearances
   this.submarineAppearances.push(this.texture1);
   this.submarineAppearances.push(this.texture2);
   this.submarineAppearances.push(this.texture3);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
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
		
	if (this.light2)
		this.lights[1].enable();
	else
		this.lights[1].disable();
	
	if (this.light3)
		this.lights[2].enable();
	else
		this.lights[2].disable();
			
	if (this.light4)
		this.lights[3].enable();
	else
		this.lights[3].disable();		
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
		//this.floor.display();
	this.popMatrix();
	
	// Post
	this.pushMatrix();
		this.translate(8,0,0.1);	
		this.scale(0.1, 4, 0.1);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.postAppearance.apply();
		this.post.display();
	this.popMatrix();

	//Clock
	this.pushMatrix();
		this.translate(8, 4.9, 0);
		this.clock.display();
	this.popMatrix();

	//Submarine
	this.pushMatrix();
		this.submarineAppearances[this.currSubmarineAppearance].apply();
		this.submarine.display();
	this.popMatrix();

	//Torpedo
	
	/*this.pushMatrix();
		this.submarineAppearances[this.currSubmarineAppearance].apply();
		this.submarine.display();
	this.popMatrix();*/

	// ---- END Primitive drawing section


	this.setUpdatePeriod(1000/60); 
};

LightingScene.prototype.update = function(currTime, valid) {
	var delta = currTime - this.lastTime;
	this.lastTime = currTime;
	
	if (this.valid)
		this.clock.update(delta);
   
   	//Update submarine
	this.submarine.update(delta);
	
};

LightingScene.prototype.clockHandler = function (){ 	
		this.valid = !this.valid;
};

/*Submarine related functions*/
LightingScene.prototype.subLeft = function (){
		this.submarine.goLeft();
};

LightingScene.prototype.subRight = function (){	
		this.submarine.goRight();
};

LightingScene.prototype.subForw = function (){
		this.submarine.accelerate();
};

LightingScene.prototype.subBack = function (){
		this.submarine.decelerate();
};

LightingScene.prototype.subUp = function (){
		this.submarine.up();
};

LightingScene.prototype.subDown = function (){
		this.submarine.down();
};

LightingScene.prototype.periUp = function (){
		this.submarine.periUp();
};

LightingScene.prototype.periDown = function (){
		this.submarine.periDown();
};

LightingScene.prototype.fireTorpedo = function (){
		this.submarine.fireTorpedo();
};
