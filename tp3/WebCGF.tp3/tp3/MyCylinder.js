/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

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

	var stepAng = 2*Math.PI / this.slices; //step in radians	
	this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();
	var depth = 1.0/this.stacks;

 	for (var i = 0; i <this.stacks; i++)
		for (var j = 0; j < this.slices; j++){
			
			this.vertices.push(Math.cos(j*stepAng),Math.sin(j*stepAng),i*depth);	
			this.normals.push(Math.cos(j*stepAng),Math.sin(j*stepAng),0);

		
			if(j < this.slices - 1){
				this.indices.push(i*this.slices + j + 0);	//0
				this.indices.push((i + 1)*this.slices + j + 1); //5
				this.indices.push((i + 1)*this.slices + j);		//4

				this.indices.push(i*this.slices + j + 0);
				this.indices.push(i*this.slices + j + 1);
				this.indices.push(i*this.slices + j + 5);
			}
 	} 	

 	//Top layer - vertexes and paired normals
 	for (var j = 0; j < this.slices; j++){
 		this.vertices.push(Math.cos(j*stepAng),Math.sin(j*stepAng), i*depth);	
		this.normals.push(Math.cos(j*stepAng),Math.sin(j*stepAng),0);
 	} 	


			for(var i = 0; i < this.stacks; i++){
				this.indices.push(i*this.slices + (this.slices-1) + 0);	//0
				this.indices.push((i + 1)*this.slices + (this.slices-1) + 1 - 4); //5
				this.indices.push(((this.stacks - 1) + 1)*this.slices + (this.slices-1));		//4

				this.indices.push(i*this.slices + (this.slices-1) + 0);
				this.indices.push(i*this.slices + (this.slices-1) + 1 - 4);
				this.indices.push(i*this.slices + (this.slices-1) + 5 - 4);
			}

	
	//DEBUG
 	console.log("vertices: " + this.vertices.length + "   " + this.vertices + "\n");
// 	console.log("normals: " +  this.normals.length + "   " +  this.normals + "\n");
 	console.log("indices: " + this.indices.length + "  " + this.indices + "\n");
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };