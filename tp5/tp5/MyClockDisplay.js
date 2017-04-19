/**
 * MyClockDisplay
 * @constructor
 */
 function MyClockDisplay(scene,slices) {
 	CGFobject.call(this,scene); 	
    this.slices = slices;

 	this.initBuffers();
 };

MyClockDisplay.prototype = Object.create(CGFobject.prototype);
MyClockDisplay.prototype.constructor=MyClockDisplay;

MyClockDisplay.prototype.initBuffers = function() {
    var stepAng = 2*Math.PI / this.slices; //step in radians	
	this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();	
	this.texCoords = new Array();

	//center
	this.vertices.push(0, 0, 0);
	this.normals.push(0, 0, 1);
	this.texCoords.push(0.5, 0.5);

	for (var i = 0; i < this.slices; i++){
		
		this.vertices.push(Math.cos(i*stepAng),Math.sin(i*stepAng),0);
		this.normals.push(0, 0, 1);
		this.texCoords.push(Math.cos(i*stepAng)/2 + 0.5, 1- (Math.sin(i*stepAng)/2 + 0.5));
	
		this.indices.push(0, i+1, i+2);	
	}

	this.vertices.push(1,0,0);
	this.normals.push(0, 0, 1);
	this.texCoords.push(1, 0.5);

	//console.log("indices: " + this.indices.length + "  " + this.indices + "\n");
		
	this.primitiveType=this.scene.gl.TRIANGLES;


	this.initGLBuffers();


};
