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
	this.texCoords = new Array();
	var deltaS = 1/this.slices;
	var deltaT = 1/this.stacks;

	var depth = 1.0/this.stacks;

 	for (let i = 0; i <=this.stacks; i++){
		for (let j = 0; j < this.slices; j++){
			//vertices and normals
			this.vertices.push(Math.cos(j*stepAng), Math.sin(j*stepAng),i*depth);	
			this.normals.push(Math.cos(j*stepAng), Math.sin(j*stepAng), 0);						
			this.texCoords.push(j*deltaS, i*deltaT);

		}
 	}

 	for(let i = 0; i < this.stacks; i++){
		for(let j = 0; j < this.slices; j++){	
			this.indices.push((i*this.slices)+j, (i*this.slices)+this.slices+j+1, i*(this.slices)+this.slices+j);
			this.indices.push((i*this.slices)+j, (i*this.slices)+(j+1)%this.slices, i*(this.slices)+this.slices+j+1);
		}
 	}

			this.indices.push(((this.stacks-1)*this.slices)+(this.slices-1), (((this.stacks-1)*this.slices)+this.slices+(this.slices-1)+1)- this.slices, (this.stacks-1)*(this.slices)+this.slices+(this.slices-1));
			this.indices.push(((this.stacks-1)*this.slices)+(this.slices-1), 0, this.stacks*this.slices);
				
	
	//DEBUG
  	console.log("vertices: " + this.vertices.length/3);
	//console.log("normals: " +  this.normals.length + "   " +  this.normals + "\n");
 	console.log("indices: " + this.indices.length + "  " + this.indices + "\n");
 	console.log("texCoords: " + this.texCoords.length + "  " + this.texCoords + "\n");
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
