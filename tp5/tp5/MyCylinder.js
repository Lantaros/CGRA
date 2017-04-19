/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
	
	this.stepAng = 2*Math.PI / this.slices;
	this.depth = 1.0/this.stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
 /*
 	* TODO:
 	* Replace the following lines in order to build a cylinder with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a cylinder with varying number of slices and stacks?
 	*/

	 //step in radians	
	this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();

 	for (var i = 0; i < this.slices; i++){
		for (var j = 0; j <= this.stacks; j++){
			this.vertices.push(Math.cos(this.stepAng * i), Math.sin(this.stepAng * i), this.depth * j);
			this.normals.push(Math.cos(this.stepAng * i), Math.sin(this.stepAng * i), 0);
		}
 	}

 		for (var i = 0; i < this.slices; i++){
			for (var j = 0; j < this.stacks; j++){
				this.indices.push(i % this.slices * (this.stacks + 1) + j);
				this.indices.push((i +1) % this.slices * (this.stacks + 1) + j);
				this.indices.push((i +1) % this.slices * (this.stacks + 1) + j + 1);
				
				this.indices.push(i % this.slices * (this.stacks + 1) + j);
				this.indices.push((i +1) % this.slices * (this.stacks + 1) + j + 1);
				this.indices.push(i % this.slices * (this.stacks + 1) + j + 1);
			}
 	}




	
	//DEBUG
//  	console.log("vertices: " + this.vertices.length/3 + "   " + this.vertices + "\n");
//  	console.log("indices: " + this.indices.length/6 + "  " + this.indices + "\n");
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };